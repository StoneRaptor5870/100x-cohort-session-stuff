import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "redis";

async function main() {
  const publishClient = createClient();
  await publishClient.connect();

  const subscribeClient = createClient();
  await subscribeClient.connect();

  const wss = new WebSocketServer({ port: 8081 });

  const subscriptions: {
    [key: string]: {
      ws: WebSocket;
      rooms: string[];
    };
  } = {};

  // setInterval(() => {
  //   console.log(subscriptions);
  // }, 5000);

  wss.on("connection", function connection(userSocket) {
    const id = randomId();
    subscriptions[id] = {
      ws: userSocket,
      rooms: [],
    };

    userSocket.on("message", function message(data) {
      const parsedMessage = JSON.parse(data as unknown as string);

      if (parsedMessage.type === "SUBSCRIBE") {
        subscriptions[id].rooms.push(parsedMessage.room);
        if (oneUserSubscribedTo(parsedMessage.room)) {
          console.log("subscribing on the pub sub to room " + parsedMessage.room);
          subscribeClient.subscribe(parsedMessage.room, (message) => {
            const parsedMessage = JSON.parse(message);
            Object.keys(subscriptions).forEach((userId) => {
              const { ws, rooms } = subscriptions[userId];
              if (rooms.includes(parsedMessage.roomId)) {
                ws.send(parsedMessage.message);
              }
            });
          });
        }
      }

      if (parsedMessage.type === "UNSUBSCRIBE") {
        subscriptions[id].rooms = subscriptions[id].rooms.filter(
          (x) => x !== parsedMessage.room
        );

        if (lastPersonLeftRoom(parsedMessage.room)) {
          console.log("unsubscribing from pub sub " + parsedMessage.room);
          subscribeClient.unsubscribe(parsedMessage.room);
        }
      }

      if (parsedMessage.type === "sendMessage") {
        const message = parsedMessage.message;
        const roomId = parsedMessage.roomId;

        publishClient.publish(
          roomId,
          JSON.stringify({
            type: "sendMessage",
            roomId: roomId,
            message,
          })
        );
      }
    });

    // userSocket.on("close", () => {
    //   subscriptions[id].rooms.forEach((room) => {
    //     if (lastPersonLeftRoom(room)) {
    //       console.log("unsubscribing from pub sub " + room);
    //       subscribeClient.unsubscribe(room);
    //     }
    //   });

    //   // Remove the user from the subscriptions list
    //   delete subscriptions[id];
    // });
  });

  function oneUserSubscribedTo(roomId: string) {
    let totalInterestedPeople = 0;
    Object.keys(subscriptions).map((userId) => {
      if (subscriptions[userId].rooms.includes(roomId)) {
        totalInterestedPeople++;
      }
    });

    if (totalInterestedPeople == 1) {
      return true;
    }

    return false;
  }

  function lastPersonLeftRoom(roomId: string) {
    let totalInterestedPeople = 0;
    Object.keys(subscriptions).map((userId) => {
      if (subscriptions[userId].rooms.includes(roomId)) {
        totalInterestedPeople++;
      }
    });

    if (totalInterestedPeople == 0) {
      return true;
    }

    return false;
  }

  function randomId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

main();
