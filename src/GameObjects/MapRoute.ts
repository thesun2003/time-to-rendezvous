import {ResourceCardColour} from "@app/GameObjects/ResourceCard";
import CurvePolygon, {XYArray} from "@app/classes/CurvePolygon";
import {gameState, turnState} from '@app/Stores/GameStore'

const width = 20;
const divisions = 32;

type ResourceCardColourForMapRoute = ResourceCardColour | 'any';

export default class MapRoute extends Phaser.GameObjects.Graphics {
    colour!: ResourceCardColour | 'any';
    curvePolygon!: CurvePolygon;

    constructor(scene: Phaser.Scene, colour: ResourceCardColourForMapRoute, points: Array<XYArray>) {
        super(scene, { lineStyle: { width: 1, color: 0xd4af37 }, fillStyle: {color: 0x04af37, alpha: 1}});

        this.colour = colour;
        this.curvePolygon = new CurvePolygon(points, width, divisions);

        this.initGameObjectLogic();
    }

    public initGameObjectLogic() {
        this.setX(0);
        this.setY(0);

        this.strokePoints(this.curvePolygon.points);
        this.setInteractive(this.curvePolygon, Phaser.Geom.Polygon.Contains);
        this.setAlpha(0.1);
        this.fillPath();

        this
            .on('pointerover', () => {
                console.log('isDrag???', turnState.isResourceCardDrag);
                console.log('isDragCard???', turnState.resourceCardDrag);
                console.log('activePlayer???', gameState.activePlayer);

                const isDrag = turnState.isResourceCardDrag;
                if (isDrag) {
                    const resourceCard = turnState.resourceCardDrag;

                    if (resourceCard?.colour !== this.colour) {
                        this.scene.input.setDefaultCursor('no-drop');
                    } else {
                        this.scene.input.setDefaultCursor('copy');
                        this.setAlpha(1);
                    }
                }
            })
            .on('pointerout', () => {
                this.scene.input.setDefaultCursor('default');
                this.setAlpha(0.1);
            })
    }
}
