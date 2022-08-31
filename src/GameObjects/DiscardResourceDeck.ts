import ResourceCard from "@app/GameObjects/ResourceCard";
import eventsCenter from '@app/EventsCenter';

export default class DiscardResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];
    backCard!: Phaser.GameObjects.Image;
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
        this.setSize(220, 330);
        this.setX(1200);
        this.setY(200);

        const texture = this.scene.textures.get(`resource-card-back`);
        this.backCard = new Phaser.GameObjects.Image(this.scene, 0, 0, texture)
            .setDisplaySize(200, 300)
            .setInteractive();

        this.textObject = new Phaser.GameObjects.Text(this.scene, -50, 170, '', { fontFamily: '"Press Start 2P"', fontSize: '36px'});

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
        this.removeInteractive();
        this.removeAll();

        this.textObject.text = `Cards: ${this.cards.length}`;

        this.add(this.backCard);
        this.add(this.textObject);

        this.setInteractive();
    }
}
