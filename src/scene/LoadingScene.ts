import 'phaser'

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('character', 'assets/character.png');
        this.load.audio('bgMusic', 'assets/background-music.mp3');
    }

    create() {
        // Add any additional setup for your loading scene
        this.scene.start('MainMenuScene'); // Switch to your main menu scene when loading is complete
    }
}