import ResourceCard, {resourceCardColoursList} from "./ResourceCard";

export default class ResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];
    gameObject!: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.init();
        this.initGameObjectLogic();
    }

    private init(): void {
        resourceCardColoursList.forEach((colour, index) => {
            for (let i = 0; i < ResourceCard.getMaxNumber(colour); i++) {
                const texture = ResourceCard.getTextureByColour(this.scene, colour);

                const card = new ResourceCard(this.scene, i * 10, index*50, texture, colour);
                //this.cards.push(card);
                this.add(card);
            }
        })

        this.setVisible(false);
        this.shuffle();
        this.setVisible(true);
    }

    public initGameObjectLogic() {
        this.setSize(1500, 200);
        this.setX(200);
        this.setY(200);
        this.setInteractive();
    }

    public createGameObject(scene: Phaser.Scene): void {
        this.gameObject = new Phaser.GameObjects.Container(scene);

        let i = 0;
        this.cards.forEach((card, index) => {
            if (i < 10) {
                card.createGameObject(scene, (index * 50) + 100, 0);
                this.gameObject.add(card.getGameObject());
            }

            i++;
        });

        this.gameObject.setSize(500, 200);
        this.gameObject.setInteractive();

        // this.gameObject.bringToTop(this.gameObject.getAt(0));
    }

    // public shuffle(): void {
    //     Phaser.Utils.Array.Shuffle(this.cards);
    // }

    public getGameObject(x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        if (x) {
            this.gameObject.setX(x);
        }

        if (y) {
            this.gameObject.setY(x);
        }

        if (children) {
            children.forEach(child => {
                this.gameObject.add(child);
            });
        }

        return this.gameObject;
    }
}