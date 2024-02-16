import Phaser from 'phaser';

import { LoadingScene } from "./scene/LoadingScene"
import { MainMenuScene } from "./scene/MainMenuScene"
import { OptionsScene } from './scene/OptionsScene'
import { CEOScene } from "./scene/CEOScene"
import { HRScene  } from "./scene/HRScene"

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 800,
    height: 600,
  },
  backgroundColor: '#000000',
  scene: [LoadingScene, MainMenuScene,OptionsScene, CEOScene, HRScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(gameConfig);
