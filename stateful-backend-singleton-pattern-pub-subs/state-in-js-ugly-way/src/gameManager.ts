interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  private games: Game[] = [];
  constructor() {
    this.games = [];
  }

  public addGame(game: Game) {
    this.games.push(game);
  }

  public getGames() {
    return this.games;
  }

  // e5e7
  public addMove(gameId: string, move: string) {
    console.log(`Adding move ${move} to game ${gameId}`)
    const game = this.games.find((game) => game.id === gameId);
    if (game) {
      game.moves.push(move);
    }
  }

  public logState() {
    console.log(this.games)
  }
}

export const gameManager = new GameManager();
