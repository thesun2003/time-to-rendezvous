import ResourceCard from "@app/classes/ResourceCard";
import eventsCenter from '@app/EventsCenter';

export default class OpenResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.init();
        this.initGameObjectLogic();
        this.render();
    }

    private init(): void {
    }

    public initGameObjectLogic() {
        this.setSize(1500, 200);
        this.setX(200);
        this.setY(600);

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
            card.setX(index * 50);
            card.setY(index * 10);

            this.add(card);
        });
        this.setInteractive();
    }
}
