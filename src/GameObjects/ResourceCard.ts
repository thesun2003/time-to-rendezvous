export type ResourceCardColour = 'pink' | 'white' | 'blue' | 'yellow' | 'orange' | 'black' | 'red' | 'green' | 'rainbow';

export const resourceCardColoursList: Array<ResourceCardColour> = ['pink', 'white', 'blue', 'yellow', 'orange', 'black', 'red', 'green', 'rainbow'];

const maxNumber = 12;
const rainbowMaxNumber = 14;

export default class ResourceCard extends Phaser.GameObjects.Image {
    id!: string;
    colour!: ResourceCardColour;
    image: string;
    textureKey!: string;
    deltaX: number = 0;
    deltaY: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: Phaser.Textures.Texture, colour: ResourceCardColour) {
        super(scene, x, y, texture);

        this.colour = colour;
        this.image = `${this.colour}`;

        this.id = Phaser.Utils.String.UUID();

        // this.textureKey = `resource-card-${this.colour}`;
        // const texture = scene.textures.get(this.textureKey);
        this.initGameObjectLogic();
    }

    static getTextureByColour(scene: Phaser.Scene, colour: ResourceCardColour) {
        return scene.textures.get(`resource-card-${colour}`);
    }

    static getMaxNumber(colour: ResourceCardColour) {
        return colour === 'rainbow' ? rainbowMaxNumber : maxNumber;
    }

    public isRainbow(): boolean {
        return this.colour === 'rainbow';
    }

    public initGameObjectLogic() {
        this.setDisplaySize(132, 200);
        this.setInteractive();

        // this.on('pointerover', () => {
        //     this.setTint(0xff0000);
        //     // console.log(this.gameObject.parentContainer);
        //     // this.gameObject.parentContainer.bringToTop(this.gameObject);
        // });
        // this.on('pointerout', () => {
        //     this.clearTint();
        // });

        // TODO: resize images and replace with setScale(1.1)
        this.on('pointerover', () => {
            this.setDisplaySize(145, 220);
        });

        this.on('pointerout', () => {
            // this.backCard.clearTint();
            this.setDisplaySize(132, 200);
        });
    }
}
