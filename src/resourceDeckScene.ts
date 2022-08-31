import "phaser";
import ResourceDeck from "@app/GameObjects/ResourceDeck";
import {resourceCardColoursList} from "@app/GameObjects/ResourceCard";
import OpenResourceDeck from "@app/GameObjects/OpenResourceDeck";
import Player from "@app/classes/Player";
import Button from '@app/UI/Button';
import eventsCenter from '@app/EventsCenter';
import {gameState, turnState} from '@app/Stores/GameStore'
import DiscardResourceDeck from "@app/GameObjects/DiscardResourceDeck";

export default class ResourceDeckScene extends Phaser.Scene {
    resourceDeck!: ResourceDeck;
    openResourceDeck!: OpenResourceDeck;
    discardResourceDeck!: DiscardResourceDeck;
    players: Array<Player> = [];
    activePlayer!: Player;

    constructor() {
        super({
            key: "ResourceDeckScene"
        });
    }

    init(/* params: any */): void {
        gameState.activePlayerIndex = 0;
    }

    preload(): void {
        this.load.setBaseURL("assets/");
        resourceCardColoursList.forEach((colour) => {
            this.load.image(`resource-card-${colour}`, `${colour}.jpeg`);
        });
        this.load.image('resource-card-back', 'resource-card-back.png');
    }

    create(): void {
        // TODO: use custom cursors
        // this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');
        // var sprite = this.add.sprite(400, 300, 'eye').setInteractive({ cursor: 'url(assets/input/cursors/pen.cur), pointer' });


        this.resourceDeck = new ResourceDeck(this);
        this.add.existing(this.resourceDeck);

        this.openResourceDeck = new OpenResourceDeck(this);
        this.add.existing(this.openResourceDeck);

        this.discardResourceDeck = new DiscardResourceDeck(this);
        this.add.existing(this.discardResourceDeck);

        this.players.push(new Player(this));
        this.players.push(new Player(this));

        this.players.forEach(player => {
            this.add.existing(player.resourceDeck);
        });

        this.setActivePlayer(gameState.activePlayerIndex);

        eventsCenter.on('end-player-turn', this.endPlayerTurn);

        const nextPlayerButton = new Button(this, 500, 500, 'Finish turn', this.endPlayerTurn, this);
        this.add.existing(nextPlayerButton);
    }

    update(time: number): void {
        // console.log('time', time);


        // const diff: number = time - this.lastStarTime;
        //
        // if (diff > this.delta) {
        //     this.lastStarTime = time;
        //     if (this.delta > 500) {
        //         this.delta -= 20;
        //     }
        //     // this.emitStar();
        // }
        //
        // this.info.text =
        //     this.starsCaught + " caught - " +
        //     this.starsFallen + " fallen (max 3)";
    }

    private setActivePlayer(playerIndex?: number) {
        this.activePlayer = this.players[playerIndex ?? gameState.activePlayerIndex];

        gameState.setActivePlayerId(this.activePlayer.id);
    }

    private endPlayerTurn() {
        gameState.activePlayerIndex +=1;
        if (gameState.activePlayerIndex > this.players.length-1) {
            gameState.activePlayerIndex = 0;
        }

        this.setActivePlayer(gameState.activePlayerIndex);

        turnState.reset();
    }

    private onClick2(star: Phaser.Physics.Arcade.Image): () => void {
        const self = this;

        return () => {
            // this.cameras.main.setPosition(this.input.mousePointer.worldX, this.input.mousePointer.worldY);
            // this.cameras.main.centerOn(star.x, star.y);
            // this.cameras.main.startFollow(star, true);
            this.cameras.main.pan(star.x, star.y, 1000, 'Sine.easeInOut');
            this.cameras.main.zoomTo(2, 1000);

            // star.setTint(0x00ff00);
            // star.setVelocity(0, 0);
            // self.starsCaught += 1;
            // self.time.delayedCall(100, (star) => {
            //     star.destroy();
            // }, [star], self);
        }
    }
}
