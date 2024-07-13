// In JavaScript, the keyword static is used in classes to declare static methods or static properties.
// Static methods and properties belong to the class itself, rather than to any specific instance of the class.

interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  private static instance: GameManager; // Create a static instance of the class
  private games: Game[] = [];

  private constructor() {
    // Private constructor ensures that a new instance cannot be created from outside
    this.games = [];
  }

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  public addGame(game: Game) {
    this.games.push(game);
  }

  public getGames() {
    return this.games;
  }

  // e5e7
  public addMove(gameId: string, move: string) {
    console.log(`Adding move ${move} to game ${gameId}`);
    const game = this.games.find((game) => game.id === gameId);
    if (game) {
      game.moves.push(move);
    }
  }

  public logState() {
    console.log(this.games);
  }
}
