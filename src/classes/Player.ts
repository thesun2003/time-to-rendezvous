import PlayerResourceDeck from "@app/GameObjects/PlayerResourceDeck";
import {autorun} from "mobx";
import {gameState} from "@app/Stores/GameStore";

export default class Player {
    id!: string;
    resourceDeck!: PlayerResourceDeck;

    constructor(scene: Phaser.Scene) {
        this.id = Phaser.Utils.String.UUID();

        this.init(scene);
        // this.setup();
    }

    private init(scene: Phaser.Scene): void {
        this.resourceDeck = new PlayerResourceDeck(scene, this.id);

        autorun(() => {
            this.resourceDeck.setVisible(gameState.activePlayerId === this.id);
        });
    }
}
