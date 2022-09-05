import "phaser";
import MapRoute from "@app/GameObjects/MapRoute";

export default class MapScene extends Phaser.Scene {
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
        this.add.image(550, 350, 'map-us');

        const mapRoutePortlandSaltLakeCity = new MapRoute(this, 'blue', [
            [120, 220],
            [140, 220],
            [240, 265],
            [310, 350],
        ]);
        this.add.existing(mapRoutePortlandSaltLakeCity);

        const mapRouteHelenaSaltLakeCity = new MapRoute(this, 'pink', [
            [380, 225],
            [310, 350],
        ]);
        this.add.existing(mapRouteHelenaSaltLakeCity);
    }

    update(time: number): void {
    }
}
