export default class Button extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, label: string, callback, context: any) {
        super(scene, x, y, label, {});

        this
            .setOrigin(0.5)
            .setPadding(20)
            .setStyle({ backgroundColor: '#111', fontSize: '36px'})
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', callback, context)
            .on('pointerover', () => this.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.setStyle({ fill: '#FFF' }));
    }
}
