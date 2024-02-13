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
    width: 512,
    height: 612,
  },
  backgroundColor: '#5c5b5b',
  scene: [LoadingScene, MainMenuScene,OptionsScene, CEOScene, HRScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(gameConfig);
