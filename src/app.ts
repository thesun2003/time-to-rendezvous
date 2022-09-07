import "phaser";
import WelcomeScene from "./welcomeScene";
import GameScene from "./gameScene";
import ScoreScene from "./scoreScene";
import GameConfig = Phaser.Types.Core.GameConfig;
import ResourceDeckScene from "./resourceDeckScene";
import MapScene from "@app/mapScene";

const config: GameConfig = {
    title: 'Time To Rendezvous',
    version: '0.0.1',
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'content',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    // scene: [WelcomeScene, GameScene, ScoreScene],
    scene: [MapScene, ResourceDeckScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#000033"
};

export default new Phaser.Game(config)