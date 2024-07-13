import { GameManager } from "./gameManager";

export function startLogger() {
  setInterval(() => {
    GameManager.getInstance().logState();
  }, 4000);
}
