import ResourceCard from "@app/GameObjects/ResourceCard";
import eventsCenter from '@app/EventsCenter';
import {turnState} from "@app/Stores/GameStore";

const initialCardsAmount = 4;

export default class PlayerResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];
    playerId!: string;

    constructor(scene: Phaser.Scene, playerId: string) {
        super(scene);

        this.playerId = playerId;

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
        this.requestInitialCards();
        this.render();
    }

    private requestInitialCards(): void {
        for (let i=0; i < initialCardsAmount; i++) {
            this.requestCard();
        }
    }

    private requestCard(): void {
        eventsCenter.emit('request-card', {requester: 'PlayerResourceDeck', type: 'Resource', playerId: this.playerId}); // TODO: use constants and types
    }

    public initGameObjectLogic() {
        this.setSize(200, 200);
        this.setX(600);
        this.setY(200);

        eventsCenter.on('receive-card', this.checkAndReceiveCard, this);

        this.scene.input.on('dragstart', (pointer, gameObject) => {
            // gameObject.scene.children.bringToTop(gameObject);

            const bounds = gameObject.getBounds();
            gameObject.deltaX = pointer.downX - bounds.x;
            gameObject.deltaY = pointer.downY - bounds.y;

            // console.log('drag', pointer, bounds);

            turnState.setIsResourceCardDrag(true);
            turnState.setResourceCardDrag(gameObject as ResourceCard);
        });
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX + gameObject.deltaX + 20;
            gameObject.y = dragY + gameObject.deltaY + 20;

            // gameObject.x = dragX;
            // gameObject.y = dragY;
        });
        this.scene.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
        });

        this.scene.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            turnState.setIsResourceCardDrag(false);
            turnState.setResourceCardDrag(null);
        });
    }

    private checkAndReceiveCard(args) {
        if (args.requester === 'PlayerResourceDeck' &&
            args.type === 'Resource' &&
            args.playerId === this.playerId)
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

        this.scene.input.setDraggable(updatedCard);

        return updatedCard;
    }

    private render() {
        this.removeInteractive();
        this.removeAll();
        this.cards.forEach((card, index) => {
            card.setX(index * 30);
            card.setY(0);

            this.add(card);
        });
        this.setInteractive();
    }
}
