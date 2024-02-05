export class FadeUtils {
    static fadeIn(scene: Phaser.Scene, duration: number = 1000, callback?: Function): void {
        // starts from black screen and fades in to the scene
        scene.cameras.main.fadeIn(duration, 0, 0, 0);

        if(callback) {
            scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => callback());
        }
    }

    static fadeOut(scene: Phaser.Scene, duration: number = 1000, callback?: Function): void {
        // fades out to black screen
        scene.cameras.main.fadeOut(duration, 0, 0, 0);

        if(callback) {
            scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => callback());
        }
    }
}