import ResourceCard from "@app/GameObjects/ResourceCard";
import eventsCenter from '@app/EventsCenter';

const width = 200;
const height = 120;

export default class DiscardResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];
    // backCard!: Phaser.GameObjects.Image;
    textObject!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.init();
        this.initGameObjectLogic();
        this.render();
    }

    private init(): void {
    }

    public initGameObjectLogic() {
        this.setSize(width, height);
        this.setDisplaySize(width, height);
        this.setX(50);
        this.setY(920);

        // const graphics = new Phaser.GameObjects.Graphics(this.scene, {lineStyle: {color: 0xff0000, width: 2}});
        // const bounds = this.getBounds();
        // graphics.strokeRoundedRect(bounds.x, bounds.y, width, height, 0);
        // this.scene.add.existing(graphics);

        // const texture = this.scene.textures.get(`resource-card-back`);
        // this.backCard = new Phaser.GameObjects.Image(this.scene, 0, 0, texture)
        //     .setDisplaySize(200, 300)
        //     .setInteractive();

        this.textObject = new Phaser.GameObjects.Text(this.scene, 0, 0, '', { fontFamily: '"Press Start 2P"', fontSize: '36px'});

        eventsCenter.on('receive-card', this.checkAndReceiveCard, this);
    }

    private checkAndReceiveCard(args) {
        if (args.requester === 'DiscardResourceDeck' &&
            args.type === 'Resource')
        {
            this.addCard(args.card);
        }
    }

    public addCard(card: ResourceCard) {
        const updatedCard = this.extendGameLogic(card);
        this.cards.push(updatedCard);

        this.render();
    }

    private extendGameLogic(card: ResourceCard): ResourceCard {
        let updatedCard = new ResourceCard(this.scene, 0, 0, ResourceCard.getTextureByColour(this.scene, card.colour), card.colour);

        card.destroy();

        return updatedCard;
    }

    private render() {
        // this.removeInteractive();
        this.removeAll();

        this.textObject.text = `Discarded\nResource\nCards: ${this.cards.length}`;

        // this.add(this.backCard);
        this.add(this.textObject);

        // this.setInteractive();
    }
}
