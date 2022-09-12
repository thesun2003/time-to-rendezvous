import "phaser";
import MapContainer from "@app/GameObjects/MapContainer";

export default class MapScene extends Phaser.Scene {
    map!: MapContainer;

    constructor() {
        super({
            key: "MapScene"
        });
    }

    init(/* params: any */): void {
    }

    preload(): void {
        this.load.setBaseURL("assets/");
        this.load.image('map-us', 'full-map-us.jpeg');
    }

    create(): void {
        this.input.setGlobalTopOnly(false);

        this.scene.launch('ResourceDeckScene');

        this.map = new MapContainer(this);
        this.add.existing(this.map);
    }

    update(time: number): void {
    }
}
