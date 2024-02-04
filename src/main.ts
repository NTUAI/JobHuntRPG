import Phaser from 'phaser';

import {LoadingScene} from "./scene/LoadingScene"
import {MainMenuScene} from "./scene/MainMenuScene"
import {GameScene} from "./scene/GameScene"

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 512,
    height: 512,
  },
  backgroundColor: '#5c5b5b',
  scene: [LoadingScene, MainMenuScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(gameConfig);
