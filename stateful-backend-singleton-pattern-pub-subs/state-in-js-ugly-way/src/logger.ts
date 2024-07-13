import { gameManager } from "./gameManager";

export function startLogger() {
  setInterval(() => {
    gameManager.logState();
  }, 4000);
}
