import "phaser";

export default class WelcomeScene extends Phaser.Scene {
    title!: Phaser.GameObjects.Text;
    hint!: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "WelcomeScene"
        });
    }

    create(): void {
        const self = this;
        const titleText: string = "Time To Rendezvous";
        const hintText: string = "Click to start";

        this.title = this.add.text(150, 200, titleText,
            { font: '128px Arial Bold', color: '#FBFBAC' });

        this.hint = this.add.text(300, 350, hintText,
            { font: '24px Arial Bold', color: '#FBFBAC' });
        this.input.on('pointerdown', (/*pointer*/) => {
            self.scene.start("GameScene");
        }, self);
    }
}