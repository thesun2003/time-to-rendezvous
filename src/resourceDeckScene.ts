import "phaser";
import ResourceDeck from "@app/classes/ResourceDeck";
import {resourceCardColoursList} from "@app/classes/ResourceCard";
import OpenResourceDeck from "@app/classes/OpenResourceDeck";

export default class ResourceDeckScene extends Phaser.Scene {
    resourceDeck!: ResourceDeck;
    openResourceDeck!: OpenResourceDeck;

    constructor() {
        super({
            key: "ResourceDeckScene"
        });
    }

    init(/* params: any */): void {
    }

    preload(): void {
        this.load.setBaseURL("assets/");
        resourceCardColoursList.forEach((colour) => {
            this.load.image(`resource-card-${colour}`, `${colour}.jpeg`);
        });
    }

    create(): void {
        this.resourceDeck = new ResourceDeck(this);
        this.add.existing(this.resourceDeck);

        this.openResourceDeck = new OpenResourceDeck(this);
        this.add.existing(this.openResourceDeck);

        this.resourceDeck.moveFiveTopCardsToOpenDeck();
    }

    update(time: number): void {
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
