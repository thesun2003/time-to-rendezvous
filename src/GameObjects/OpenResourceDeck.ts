import ResourceCard from "@app/GameObjects/ResourceCard";
import eventsCenter from '@app/EventsCenter';
import {gameState, turnState} from "@app/Stores/GameStore";

const maxCardsAmount = 5;
const maxRainbowAmount = 3;

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
            this.discardCards();
            this.balanceDeck();
        }
    }

    private isValid(): boolean {
        let rainbowAmount = 0;
        this.cards.forEach(card => {
            if (card.isRainbow()) {
                rainbowAmount += 1;
            }
        });

        return rainbowAmount < maxRainbowAmount;
    }

    private requestCard(): void {
        eventsCenter.emit('request-card', {requester: 'OpenResourceDeck', type: 'Resource'}); // TODO: use constants and types
    }

    private ejectSelectedCard(selectedCard: ResourceCard): ResourceCard {
        this.cards = this.cards.filter(card => card.id !== selectedCard.id);

        return selectedCard;
    }

    public initGameObjectLogic() {
        this.setSize(1500, 200);
        this.setX(200);
        this.setY(800);

        eventsCenter.on('receive-card', this.checkAndReceiveCard, this);
    }

    private checkAndReceiveCard(args) {
        if (args.requester === 'OpenResourceDeck' &&
            args.type === 'Resource')
        {
            this.addCard(args.card);
        }
    }

    private checkAndMoveCard(args): void {
        if (args.type === 'Resource' && args.requester) {
            args.card = this.ejectSelectedCard(args.selectedCard);

            eventsCenter.emit('receive-card', args);
        }

        this.balanceDeck();
        this.render();
    }

    private discardCards():void {
        this.cards.forEach(card => {
            const args = {
                type: 'Resource',
                requester: 'DiscardResourceDeck',
                selectedCard: card,
            };
            this.checkAndMoveCard(args);
        });
    }

    public addCard(card: ResourceCard) {
        const updatedCard = this.extendGameLogic(card);
        this.cards.push(updatedCard);

        this.render();
    }

    private extendGameLogic(card: ResourceCard): ResourceCard {
        let updatedCard = new ResourceCard(this.scene, 0, 0, ResourceCard.getTextureByColour(this.scene, card.colour), card.colour);

        updatedCard
            .on('pointerup', () => {
            console.log('ableRequestResourceCard', turnState.ableRequestResourceCard);

            if (turnState.ableRequestResourceCard) {
                const args = {
                    type: 'Resource',
                    requester: 'PlayerResourceDeck',
                    playerId: gameState.activePlayerId,
                    selectedCard: updatedCard,
                };
                this.checkAndMoveCard(args);

                if (updatedCard.isRainbow()) {
                    turnState.setRainbowResourceCardRequested();
                } else {
                    turnState.decreaseResourceCardsAvailableForRequest();
                }
            }
        });

        card.destroy();

        return updatedCard;
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
