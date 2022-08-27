import "phaser";

export default class ScoreScene extends Phaser.Scene {
    score!: number;
    result!: Phaser.GameObjects.Text;
    hint!: Phaser.GameObjects.Text;

    public constructor() {
        super({
            key: "ScoreScene"
        });
    }

    public init(params: any): void {
        this.score = params.starsCaught;
    }

    public create(): void {
        const self = this;
        const resultText: string = 'Your score is ' + this.score + '!';
        const hintText: string = "Click to restart";

        this.result = this.add.text(200, 250, resultText,
            { font: '48px Arial Bold', color: '#FBFBAC' });

        this.hint = this.add.text(300, 350, hintText,
            { font: '24px Arial Bold', color: '#FBFBAC' });


        this.input.on('pointerdown', (/*pointer*/) => {
            self.scene.start("WelcomeScene");
        }, self);
    }
}