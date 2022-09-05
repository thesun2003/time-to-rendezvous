import {flatten} from 'lodash';

export type XYArray = [number, number];

export default class CurvePolygon extends Phaser.Geom.Polygon {
    curve!: Phaser.Curves.Spline;

    constructor(points: Array<XYArray>, width: number, divisions: number = 16) {
        super();

        this.curve = new Phaser.Curves.Spline(flatten(points));

        const curvePoints = [];
        const curveTangents = [];
        const tempVec = new Phaser.Math.Vector2();


        for (let i=0; i <= divisions; i++) {
            const fragment = (i / divisions);
            const t = this.curve.getUtoTmapping(fragment, fragment * this.curve.getLength());

            curvePoints.push(this.curve.getPoint(t));
            curveTangents.push(this.curve.getTangent(t));
        }

        const upperPoints = curvePoints.map((point, index) => {
            tempVec.copy(curveTangents[index]).normalizeRightHand().scale(-1 * (width/2)).add(point);

            return [tempVec.x, tempVec.y];
        });

        const lowerPoints = curvePoints.map((point, index) => {
            tempVec.copy(curveTangents[index]).normalizeRightHand().scale((width/2)).add(point);

            return [tempVec.x, tempVec.y];
        }).reverse();

        const polygonPoints = [...upperPoints, ...lowerPoints, upperPoints[0]];

        this.setTo(flatten(polygonPoints));
    }
}
