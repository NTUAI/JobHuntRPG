import Phaser from 'phaser';

import { LoadingScene } from "./scene/LoadingScene"
import { MainMenuScene } from "./scene/MainMenuScene"
import { OptionsScene } from './scene/OptionsScene'
import { GameScene } from "./scene/GameScene"

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 800,
    height: 600,
  },
  backgroundColor: '#000000',
  scene: [LoadingScene, MainMenuScene,OptionsScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(gameConfig);
