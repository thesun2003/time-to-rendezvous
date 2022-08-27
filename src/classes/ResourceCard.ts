type ResourceCardColour = 'pink' | 'white' | 'blue' | 'yellow' | 'orange' | 'black' | 'red' | 'green' | 'rainbow';

export const resourceCardColoursList: Array<ResourceCardColour> = ['pink', 'white', 'blue', 'yellow', 'orange', 'black', 'red', 'green', 'rainbow'];

const maxNumber = 12;
const rainbowMaxNumber = 14;

export default class ResourceCard extends Phaser.GameObjects.Image {
    id!: string;
    color: ResourceCardColour | null = null;
    image: string;
    textureKey!: string;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: Phaser.Textures.Texture, color: ResourceCardColour) {
        super(scene, x, y, texture);

        this.color = color;
        this.image = `${this.color}`;

        this.id = Phaser.Utils.String.UUID();

        // this.textureKey = `resource-card-${this.color}`;
        // const texture = scene.textures.get(this.textureKey);
        this.initGameObjectLogic();
    }

    static getTextureByColour(scene: Phaser.Scene, color: ResourceCardColour) {
        return scene.textures.get(`resource-card-${color}`);
    }

    static getMaxNumber(color: ResourceCardColour) {
        return color === 'rainbow' ? rainbowMaxNumber : maxNumber;
    }

    public initGameObjectLogic() {
        this.setDisplaySize(200, 200);
        this.setInteractive();

        // this.on('pointerover', () => {
        //     this.setTint(0xff0000);
        //     // console.log(this.gameObject.parentContainer);
        //     // this.gameObject.parentContainer.bringToTop(this.gameObject);
        // });
        // this.on('pointerout', () => {
        //     this.clearTint();
        // });
    }
}
