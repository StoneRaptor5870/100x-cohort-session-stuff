import { GameManager } from "./gameManager";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
  GameManager.getInstance().addGame({
    id: Math.random().toString(),
    whitePlayer: "nischay",
    blackPlayer: "anuj",
    moves: [],
  });
}, 5000);
