import { makeAutoObservable, observable, computed } from "mobx"

class GameStore {
    activePlayerId: string = '';
    activePlayerIndex: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setActivePlayerId(playerId: string) {
        this.activePlayerId = playerId;
    }
}

export const gameState = new GameStore();
