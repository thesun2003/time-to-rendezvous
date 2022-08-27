import "phaser";
import ResourceDeck from "./classes/ResourceDeck";

export default class GameScene extends Phaser.Scene {
    delta!: number;
    lastStarTime!: number;
    starsCaught!: number;
    starsFallen!: number;
    sand!: Phaser.Physics.Arcade.StaticGroup;
    info!: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(/* params: any */): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }

    preload(): void {
        this.load.setBaseURL(
            "https://raw.githubusercontent.com/mariyadavydova/" +
            "starfall-phaser3-typescript/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create(): void {
        // this.scale.resize(1920, 1080);
        this.cameras.main.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);

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

        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20
        });

        Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
            new Phaser.Geom.Line(20, 580, 820, 580));
        this.sand.refresh();
        this.info = this.add.text(10, 10, '123',
            { font: '24px Arial Bold', color: '#FBFBAC' });

        const FKey = this.input.keyboard.addKey('F');
        FKey.on('down', () => {
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }

        }, this);

        const ZKey = this.input.keyboard.addKey('Z');
        ZKey.on('down', () => {
            this.cameras.main.zoomTo(2, 1000);

        }, this);

        const AKey = this.input.keyboard.addKey('A');
        AKey.on('down', () => {
            this.cameras.main.zoomTo(1, 1000);

        }, this);

        let star: Phaser.Physics.Arcade.Image = this.physics.add.image(500, 500, "star");
        star.setDisplaySize(50, 50);
        // star.setVelocity(0, 200);
        star.setInteractive();

        star.on('pointerdown', this.onClick2(star), this);
        star.on('pointerover', this.onHover(star), this);
        star.on('pointerout', this.onOut(star), this);
    }

    update(time: number): void {
        const diff: number = time - this.lastStarTime;

        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            // this.emitStar();
        }

        this.info.text =
            this.starsCaught + " caught - " +
            this.starsFallen + " fallen (max 3)";
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

    private onClick(star: Phaser.Physics.Arcade.Image): () => void {
        const self = this;

        return () => {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            self.starsCaught += 1;
            self.time.delayedCall(100, (star) => {
                star.destroy();
            }, [star], self);
        }
    }

    private onFall(star: Phaser.Physics.Arcade.Image): () => void {
        const self = this;

        return function () {
            star.setTint(0xff0000);
            self.starsFallen += 1;
            self.time.delayedCall(100, function (star) {
                star.destroy();
                if (self.starsFallen > 2) {
                    self.scene.start("ScoreScene",
                        { starsCaught: self.starsCaught });
                }
            }, [star], self);
        }
    }

    private emitStar(): void {
        const x = Phaser.Math.Between(25, 775);
        const y = 26;

        let star: Phaser.Physics.Arcade.Image = this.physics.add.image(x, y, "star");

        star.setDisplaySize(50, 50);
        star.setVelocity(0, 200);
        star.setInteractive();

        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.sand, this.onFall(star), undefined, this);
    }
}
