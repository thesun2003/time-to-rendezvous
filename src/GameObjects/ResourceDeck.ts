import ResourceCard, {resourceCardColoursList} from "@app/GameObjects/ResourceCard";
import eventsCenter from '@app/EventsCenter';
import {autorun} from "mobx";
import {gameState, turnState} from '@app/Stores/GameStore'

export default class ResourceDeck extends Phaser.GameObjects.Container {
    cards: Array<ResourceCard> = [];
    backCard!: Phaser.GameObjects.Image;
    textObject!: Phaser.GameObjects.Text;
    textObject1!: Phaser.GameObjects.Text;

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

        console.log('cards.length', this.cards.length);

        return card !== undefined ? card : null;
    }

    public initGameObjectLogic() {
        this.setSize(220, 330);
        this.setX(200);
        this.setY(200);

        const texture = this.scene.textures.get(`resource-card-back`);
        this.backCard = new Phaser.GameObjects.Image(this.scene, 0, 0, texture)
            .setDisplaySize(200, 300)
            .setInteractive()
            .on('pointerover', () => {
                // this.backCard.setTint(0xff0000);
                this.backCard.setDisplaySize(220, 330);
            })
            .on('pointerout', () => {
                // this.backCard.clearTint();
                this.backCard.setDisplaySize(200, 300);
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

        this.textObject = new Phaser.GameObjects.Text(this.scene, -50, 170, '', { fontFamily: '"Press Start 2P"', fontSize: '36px'});
        this.textObject1 = new Phaser.GameObjects.Text(this.scene, -50, 210, '', { fontFamily: '"Press Start 2P"', fontSize: '36px'});

        autorun(() => {
            this.textObject1.text = `ActivePlayerId: ${gameState.activePlayerId}`;
        });
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
        this.add(this.textObject1);

        this.setInteractive();
    }

    public shuffleCards(): void {
        Phaser.Utils.Array.Shuffle(this.cards);
    }
}
