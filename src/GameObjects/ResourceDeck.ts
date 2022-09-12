import ResourceCard, {resourceCardColoursList} from "@app/GameObjects/ResourceCard";
import eventsCenter from '@app/EventsCenter';
import {gameState, turnState} from '@app/Stores/GameStore'

export default class ResourceDeck extends Phaser.GameObjects.Container {
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
        resourceCardColoursList.forEach((colour, index) => {
            for (let i = 0; i < ResourceCard.getMaxNumber(colour); i++) {
                const texture = ResourceCard.getTextureByColour(this.scene, colour);

                const card = new ResourceCard(this.scene, 0, 0, texture, colour);
                this.cards.push(card);
            }
        })

        this.shuffleCards();

        eventsCenter.on('request-card', this.checkAndMoveCard, this);
    }

    private ejectTopCard(): ResourceCard | null {
        const card = this.cards.pop();

        return card !== undefined ? card : null;
    }

    public initGameObjectLogic() {
        this.setSize(420, 220);
        this.setX(1600);
        this.setY(130);

        const texture = this.scene.textures.get(`resource-card-back`);
        this.backCard = new Phaser.GameObjects.Image(this.scene, 0, 0, texture)
            .setDisplaySize(132, 200)
            .setInteractive()
            .setAngle(90)
            .on('pointerover', () => {
                this.backCard.setDisplaySize(145, 220);
            })
            .on('pointerout', () => {
                this.backCard.setDisplaySize(132, 200);
            })
            .on('pointerup', () => {
                console.log('ableRequestResourceCard', turnState.ableRequestResourceCard);

                if (turnState.ableRequestResourceCard) {
                    const args = {
                        type: 'Resource',
                        requester: 'PlayerResourceDeck',
                        playerId: gameState.activePlayerId,
                    };
                    this.checkAndMoveCard(args);

                    turnState.decreaseResourceCardsAvailableForRequest();
                }
            });

        this.textObject = new Phaser.GameObjects.Text(this.scene, 140, -25, '', { fontFamily: '"Press Start 2P"', fontSize: '36px'});
    }

    private checkAndMoveCard(args): void {
        if (args.type === 'Resource' && args.requester) {
            args.card = this.ejectTopCard();

            eventsCenter.emit('receive-card', args);
        }

        this.render();
    }

    private render() {
        this.removeInteractive();
        this.removeAll();

        this.textObject.text = `Cards: ${this.cards.length}`;

        this.add(this.backCard);
        this.add(this.textObject);

        this.setInteractive();
    }

    public shuffleCards(): void {
        Phaser.Utils.Array.Shuffle(this.cards);
    }
}
