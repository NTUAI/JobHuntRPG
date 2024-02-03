import 'phaser'

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        
    }

    create() {
        // Add any additional setup for your loading scene
        this.scene.start('MainMenuScene'); // Switch to your main menu scene when loading is complete
    }
}