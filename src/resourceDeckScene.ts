import "phaser";
import ResourceDeck from "./classes/ResourceDeck";
import {resourceCardColoursList} from "./classes/ResourceCard";

export default class ResourceDeckScene extends Phaser.Scene {
    resourceDeck!: ResourceDeck;

    constructor() {
        super({
            key: "ResourceDeckScene"
        });
    }

    init(/* params: any */): void {
        // this.resourceDeck = new ResourceDeck(this);
        //
        // console.log(this.resourceDeck);
    }

    preload(): void {
        this.load.setBaseURL("assets/");
        resourceCardColoursList.forEach((colour) => {
            this.load.image(`resource-card-${colour}`, `${colour}.jpeg`);
        });
    }

    create(): void {
        // TODO: use containers
        // var bg = this.add.image(0, 0, 'buttonBG').setInteractive();
        // var text = this.add.image(0, 0, 'buttonText');
        //
        // var container = this.add.container(0, 0, [ bg, text ]);
        // container.setAngle(20);
        //
        // var container2 = this.add.container(400, 300, container);
        // container2.setScale(1.5);
        //
        // container.add([ sprite0, sprite1, sprite2 ]);

        // TODO: use for cards
        // var image1 = this.add.image(100, 90, 'block');
        // var image2 = this.add.image(150, 90, 'block');
        // var image3 = this.add.image(200, 90, 'block');
        // var image4 = this.add.image(250, 90, 'block');
        //
        // container = this.add.container(300, 300, [ image1, image2, image3, image4 ]);
        //
        // container.bringToTop(image2);

        // this.resourceDeck.createGameObject(this);
        // const resourceDeckGameObject = this.resourceDeck.getGameObject(300, 300);
        //
        // this.add.existing(resourceDeckGameObject);

        this.resourceDeck = new ResourceDeck(this);
        console.log(this.resourceDeck);

        this.add.existing(this.resourceDeck);

        // let star: Phaser.Physics.Arcade.Image = this.physics.add.image(500, 500, "star");
        // star.setDisplaySize(50, 50);
        // // star.setVelocity(0, 200);
        // star.setInteractive();
        // star.on('pointerdown', this.onClick2(star), this);
        // star.on('pointerover', this.onHover(star), this);
        // star.on('pointerout', this.onOut(star), this);
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

    private onHover(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.setTint(0xff0000);
        }
    }

    private onOut(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.clearTint();
        }
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
