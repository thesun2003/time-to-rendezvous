import ResourceCard, {resourceCardColoursList} from "@app/classes/ResourceCard";
import eventsCenter from '@app/EventsCenter';

export default class ResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];

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

                card.on('pointerover', () => {
                    card.setTint(0xff0000);
                    // console.log(this.gameObject.parentContainer);
                    // this.gameObject.parentContainer.bringToTop(this.gameObject);
                });
                card.on('pointerout', () => {
                    card.clearTint();
                });

                card.on('pointerup', () => {
                    // this.remove(card);

                    const indexToRemove = this.cards.findIndex(cardInArray => cardInArray.id === card.id);
                    Phaser.Utils.Array.RemoveAt(this.cards, indexToRemove);
                    this.render();

                    eventsCenter.emit('move-card-to-open-deck', card);
                });

                this.cards.push(card);
                // this.add(card);
            }
        })

        this.shuffleCards();
    }

    private ejectTopCard(): ResourceCard | null {
        const card = this.cards.pop();

        return card !== undefined ? card : null;
    }

    public moveFiveTopCardsToOpenDeck() {
        for (let i=0; i < 5; i++) {
            const card = this.ejectTopCard();

            if (card !== null) {
                eventsCenter.emit('move-card-to-open-deck', card);
            }
        }
    }

    public initGameObjectLogic() {
        this.setSize(1500, 200);
        this.setX(200);
        this.setY(200);
    }

    private render() {
        this.removeInteractive();
        this.removeAll();
        this.cards.forEach((card, index) => {
            card.setX(index * 50);
            card.setY(index * 10);

            this.add(card);
        });
        this.setInteractive();
    }

    public shuffleCards(): void {
        Phaser.Utils.Array.Shuffle(this.cards);
    }
}
