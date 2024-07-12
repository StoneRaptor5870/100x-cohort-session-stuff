import { games } from "./store";
import { startLogger } from "./logger";

startLogger();

// state management

setInterval(() => {
  games.push({
    id: Math.random().toString(),
    whitePlayer: "nischay",
    blackPlayer: "anuj",
    moves: [],
  });
}, 5000);


// web socket server