import ResourceCard, {resourceCardColoursList} from "@app/classes/ResourceCard";
import eventsCenter from '@app/EventsCenter';

export default class ResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];
    backCard!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.init();
        this.initGameObjectLogic();
        this.render();
    }

    private init(): void {
        resourceCardColoursList.forEach((colour, index) => {
            for (let i = 0; i < ResourceCard.getMaxNumber(colour); i++) {
                const texture = ResourceCard.getTextureByColour(this.scene, colour);

                const card = new ResourceCard(this.scene, 0, 0, texture, colour);

                // card.on('pointerover', () => {
                //     card.setTint(0xff0000);
                // });

                // card.on('pointerout', () => {
                //     card.clearTint();
                // });

                // card.on('pointerup', () => {
                //     // this.remove(card);
                //
                //     const indexToRemove = this.cards.findIndex(cardInArray => cardInArray.id === card.id);
                //     Phaser.Utils.Array.RemoveAt(this.cards, indexToRemove);
                //     this.render();
                //
                //     eventsCenter.emit('move-card-to-open-deck', card);
                // });

                this.cards.push(card);
            }
        })

        this.shuffleCards();
    }

    private ejectTopCard(): ResourceCard | null {
        const card = this.cards.pop();

        return card !== undefined ? card : null;
    }

    public initGameObjectLogic() {
        this.setSize(200, 200);
        this.setX(200);
        this.setY(200);

        const texture = this.scene.textures.get(`resource-card-back`);
        this.backCard = new Phaser.GameObjects.Image(this.scene, 0, 0, texture);
        this.backCard.setDisplaySize(200, 300);
        this.backCard.setInteractive();

        this.backCard.on('pointerover', () => {
            this.backCard.setDisplaySize(220, 330);
        });

        this.backCard.on('pointerout', () => {
            // this.backCard.clearTint();
            this.backCard.setDisplaySize(200, 300);
        });

        eventsCenter.on('request-card', this.checkAndMoveCard, this);
    }

    private checkAndMoveCard(args): void {
        if (args.type === 'Resource') {
            // TODO: switch to switch :-D
            if (args.requester === 'OpenResourceDeck') {
                const card = this.ejectTopCard();
                eventsCenter.emit('move-card-to-open-deck', card);
            }
        }
    }

    private render() {
        this.removeInteractive();
        this.removeAll();
        // this.cards.forEach((card, index) => {
        //     card.setX(index * 50);
        //     card.setY(index * 10);
        //
        //     this.add(card);
        // });

        this.add(this.backCard);
        this.setInteractive();
    }

    public shuffleCards(): void {
        Phaser.Utils.Array.Shuffle(this.cards);
    }
}
