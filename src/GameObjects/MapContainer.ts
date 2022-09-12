import MapRoute from "@app/GameObjects/MapRoute";

export default class MapContainer extends Phaser.GameObjects.Container {
    mapImage!: Phaser.GameObjects.Image;
    routes: Array<MapRoute> = [];

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.loadRoutes();
        this.initGameObjectLogic();
    }

    public loadRoutes() {
        const mapRoutePortlandSaltLakeCity = new MapRoute(this.scene, ['Portland', 'Salt Lake City'], 'blue', [
            [120, 220],
            [140, 220],
            [240, 265],
            [310, 350],
        ]);

        const mapRouteHelenaSaltLakeCity = new MapRoute(this.scene, ['Helena', 'Salt Lake City'], 'pink', [
            [380, 225],
            [310, 350],
        ]);

        this.routes.push(mapRouteHelenaSaltLakeCity, mapRoutePortlandSaltLakeCity);
    }

    public initGameObjectLogic() {
        this.setX(400);
        this.setY(50);

        this.mapImage = new Phaser.GameObjects.Image(this.scene, 550, 350, 'map-us');

        this.render();
    }

    render() {
        this.removeInteractive();
        this.removeAll();

        this.add(this.mapImage);
        this.routes.forEach((route, index) => {
            this.add(route);
        });

        this.setInteractive();
    }
}
