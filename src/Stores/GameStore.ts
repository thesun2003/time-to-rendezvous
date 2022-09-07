import { makeAutoObservable, observable, computed } from "mobx"
import ResourceCard from "@app/GameObjects/ResourceCard";
import Player from "@app/classes/Player";

class GameState {
    activePlayerId: string = '';
    activePlayerIndex: number = 0;
    activePlayer: Player | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setActivePlayerId(playerId: string) {
        this.activePlayerId = playerId;
    }

    setActivePlayer(player: Player | null) {
        this.activePlayer = player;
    }
}

class TurnState {
    resourceCardsAvailableForRequest: number = 2;
    rainbowResourceCardRequested: boolean = false;
    isResourceCardDrag: boolean = false;
    resourceCardDrag: ResourceCard | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.resourceCardsAvailableForRequest = 2;
        this.rainbowResourceCardRequested = false;
        this.isResourceCardDrag = false;
        this.resourceCardDrag = null;
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

    setIsResourceCardDrag(value: boolean) {
        this.isResourceCardDrag = value;
    }

    setResourceCardDrag(card: ResourceCard | null) {
        this.resourceCardDrag = card;
    }
}

export const gameState = new GameState();
export const turnState = new TurnState();
