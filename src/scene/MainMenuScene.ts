import { CST } from "../CST";
import { FadeUtils } from "../FadeUtils";
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }

    init() {}

    create() {
        this.sound.add(CST.AUDIO.TITLE_AUDIO, { loop: true }).play();
        this.sound.add(CST.AUDIO.TITLE_MUSIC, { volume: 0.3, loop: true }).play();

        //create images (z order)
        //this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.LOGO).setDepth(1);
        this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0).setDepth(0).setScale(0.5);
        let playButton = this.add.image(70, 30, CST.IMAGE.PLAY).setDepth(1).setScale(0.2);
        let optionsButton = this.add.image(260, 30, CST.IMAGE.OPTIONS).setDepth(1).setScale(0.2);
        let quitButton = this.add.image(450, 30, CST.IMAGE.QUIT).setDepth(1).setScale(0.2);
        let hoverImg = this.add.image(100, 100, CST.IMAGE.HOVER).setScale(0.15).setVisible(false);

        //create sprites (if using pixel art, remove sharpen)
        /*let hoverSprite: Phaser.GameObjects.Sprite = this.add.sprite(100, 100, CST.SPRITE.CAT);
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);*/

        //create audio, disable pauseonblur
        //this.sound.pauseOnBlur = false;
        //this.sound.play(CST.AUDIO.TITLE, {loop: true})

        //create animation

        //make image buttons interactive
        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */


        // play button
        playButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverImg.setVisible(true);
            hoverImg.setX(playButton.x);
            hoverImg.setY(playButton.y+50);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        playButton.on("pointerout", () => {
            hoverImg.setVisible(false);
        })

        playButton.on("pointerup", () => {
            let a = this.sound.add(CST.AUDIO.TITLE_START, {volume: 1});
            this.sound.stopAll();
            a.play();
            optionsButton.setVisible(false);
            quitButton.setVisible(false);

            const fadeDuration = 5000; // 1 second

            // Start fading to black. The color is specified in hex (0xRRGGBB). 0x000000 is black.
            /*this.cameras.main.fade(fadeDuration, 0, 0, 0, false, (camera, progress) => {
                if (progress === 1) {
                    // This callback function is called when the fade completes.
                    // Switch to the target scene here.
                    
                    this.scene.start(CST.SCENES.PLAY);
                }
            });*/
            FadeUtils.fadeOut(this, 5000, (callback) => {
                console.log("aoiwejfoaisjdfo isamfowei noaiwfdj oisajof iejwoiajf oiejo ")
                this.scene.start(CST.SCENES.PLAY);
            });

        });

        // options button
        optionsButton.setInteractive();

        optionsButton.on("pointerover", () => {
            hoverImg.setVisible(true);
            hoverImg.setX(optionsButton.x);
            hoverImg.setY(optionsButton.y+50);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        optionsButton.on("pointerout", () => {
            hoverImg.setVisible(false);
        })

        optionsButton.on("pointerup", () => {
            //this.scene.launch();
        })


        // quit button
        quitButton.setInteractive();
        quitButton.on("pointerover", () => {
            hoverImg.setVisible(true);
            hoverImg.setX(quitButton.x);
            hoverImg.setY(quitButton.y+50);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        optionsButton.on("pointerout", () => {
            hoverImg.setVisible(false);
        })
        quitButton.on("pointerup", () => {
            window.location.href = "https://eosphor.us";
        })

        quitButton.on("pointerout", () => {
            hoverImg.setVisible(false);
        })

    }
}