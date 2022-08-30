import { makeAutoObservable, observable, computed } from "mobx"

class GameState {
    activePlayerId: string = '';
    activePlayerIndex: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setActivePlayerId(playerId: string) {
        this.activePlayerId = playerId;
    }
}

class TurnState {
    resourceCardsAvailableForRequest: number = 2;
    rainbowResourceCardRequested: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.resourceCardsAvailableForRequest = 2;
        this.rainbowResourceCardRequested = false;
    }

    get ableRequestResourceCard() {
        if (this.rainbowResourceCardRequested) {
            return false;
        }

        if (this.resourceCardsAvailableForRequest === 0) {
            return false;
        }

        return true;
    }

    decreaseResourceCardsAvailableForRequest() {
        if (this.resourceCardsAvailableForRequest > 0 && !this.rainbowResourceCardRequested) {
            this.resourceCardsAvailableForRequest -=1;
        }
    }

    setRainbowResourceCardRequested() {
        this.rainbowResourceCardRequested = true;
    }
}

export const gameState = new GameState();
export const turnState = new TurnState();
