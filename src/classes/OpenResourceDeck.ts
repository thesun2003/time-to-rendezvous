import ResourceCard from "@app/classes/ResourceCard";
import eventsCenter from '@app/EventsCenter';

const maxCardsAmount = 5;

export default class OpenResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.init();
        this.initGameObjectLogic();
        this.setup();
        this.render();
    }

    private init(): void {
    }

    /**
     * Run after the GameObject has been created
     *
     * @private
     */
    private setup(): void {
        this.balanceDeck();
        this.render();
    }

    private balanceDeck(): void {
        const currentCardsAmount = this.cards.length;
        if (currentCardsAmount < maxCardsAmount) {
            for (let i=currentCardsAmount; i < maxCardsAmount; i++) {
                this.requestCard();
            }
        }

        if (!this.isValid()) {
            this.balanceDeck();
        }
    }

    private isValid(): boolean {
        // TODO: add logic to validate the deck state according to the rules
        return true;
    }

    private requestCard(): void {
        eventsCenter.emit('request-card', {requester: 'OpenResourceDeck', type: 'Resource'}); // TODO: use constants and types
    }

    public initGameObjectLogic() {
        this.setSize(1500, 200);
        this.setX(200);
        this.setY(800);

        eventsCenter.on('move-card-to-open-deck', this.addCard, this);
    }

    public addCard(card: ResourceCard) {
        this.cards.push(card);

        this.render();
    }

    private render() {
        this.removeInteractive();
        this.removeAll();
        this.cards.forEach((card, index) => {
            card.setX(index * 250);
            card.setY(0);

            this.add(card);
        });
        this.setInteractive();
    }
}
