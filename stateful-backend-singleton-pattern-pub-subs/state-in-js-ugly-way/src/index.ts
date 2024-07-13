import { gameManager } from "./gameManager";
import { startLogger } from "./logger";

startLogger();

// state management

setInterval(() => {
  gameManager.addGame({
    id: Math.random().toString(),
    whitePlayer: "nischay",
    blackPlayer: "anuj",
    moves: [],
  });
}, 5000);

// web socket server
