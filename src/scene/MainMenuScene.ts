import { CST } from "../CST";
import { FadeUtils } from "../FadeUtils";
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENE.MENU
        })
    }

    init() {}

    toCEO(): void {
        let a = this.sound.add(CST.AUDIO.TITLE_START, {volume: 1});
        this.sound.stopAll();
        a.play();

        const fadeDuration = 5000; // 1 second

        // Start fading to black. The color is specified in hex (0xRRGGBB). 0x000000 is black.
        FadeUtils.fadeOut(this, 5000, (callback) => {
            console.log("Game starting")
            this.scene.start(CST.SCENE.CEO);
        });
    }

    create() {
        //console.log(`Starting to load from directory: ${this.load.path}`);
        this.game.canvas.style.cursor = `url('assets/images/cursor1.png'), default`;
        //this.game.canvas.style.cursor = `url('assets/images/cursor1.png'), pointer`;
        //const sprite = this.add.sprite(400, 300, 'eye').setInteractive({ cursor: 'url(assets/images/cursor1.png), pointer' });
        // alert("test");
        FadeUtils.fadeIn(this, 2000, (callback) => {
            console.log("MainMenuScene activated")
        });
        this.sound.add(CST.AUDIO.TITLE_AUDIO, { loop: true }).play();
        this.sound.add(CST.AUDIO.TITLE_MUSIC, { volume: 0.3, loop: true }).play();

        //create images (z order)
        //this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.LOGO).setDepth(1);
        this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0).setDepth(0).setScale(0.5);
        let playButton = this.add.image(470, 50, CST.IMAGE.PLAY).setDepth(1).setScale(0.4);
        let optionsButton = this.add.image(470, 150, CST.IMAGE.OPTIONS).setDepth(1).setScale(0.4);
        let quitButton = this.add.image(470, 250, CST.IMAGE.QUIT).setDepth(1).setScale(0.4);
        let EosRPG = this.add.image(400, 400, CST.IMAGE.EOSRPG_LOGO).setDepth(1).setScale(0.4);
        let hoverImg = this.add.image(100, 100, CST.IMAGE.HOVER).setScale(0.15).setVisible(false);

        // Example of creating a volume slider (simplified)
        let volumeSliderTrack = this.add.graphics().setVisible(false);
        volumeSliderTrack.fillStyle(0x888888, 1);
        volumeSliderTrack.fillRect(400, 300, 150, 20); // Just an example position and size

        let volumeSliderKnob = this.add.graphics().setVisible(false);
        volumeSliderKnob.fillStyle(0xffffff, 1);
        volumeSliderKnob.fillRect(525, 295, 30, 30); // Position this based on current volume


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
            playButton.setX(playButton.x-10);
            hoverImg.setVisible(true);
            hoverImg.setX(playButton.x-80);
            hoverImg.setY(playButton.y);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        playButton.on("pointerout", () => {
            playButton.setX(playButton.x+10);
            hoverImg.setVisible(false);
        })

        playButton.on("pointerup", () => {
            playButton.setVisible(false);
            optionsButton.setVisible(false);
            quitButton.setVisible(false);
            hoverImg.setVisible(false);
            this.toCEO();
        });

        // options button
        optionsButton.setInteractive();

        optionsButton.on("pointerover", () => {
            optionsButton.setX(optionsButton.x-10);
            hoverImg.setVisible(true);
            hoverImg.setX(optionsButton.x-80);
            hoverImg.setY(optionsButton.y);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        optionsButton.on("pointerout", () => {
            optionsButton.setX(optionsButton.x+10);
            hoverImg.setVisible(false);
        })

        optionsButton.on("pointerup", () => {
            playButton.setVisible(false);
            optionsButton.setVisible(false);
            quitButton.setVisible(false);
            hoverImg.setVisible(false);     
            
            // Show volume controls
            volumeSliderTrack.setVisible(true);
            volumeSliderKnob.setVisible(true);

        })


        // quit button
        quitButton.setInteractive();
        quitButton.on("pointerover", () => {
            quitButton.setX(quitButton.x-10);
            hoverImg.setVisible(true);
            hoverImg.setX(quitButton.x-80);
            hoverImg.setY(quitButton.y);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        quitButton.on("pointerout", () => {
            quitButton.setX(quitButton.x+10);
            hoverImg.setVisible(false);
        })
        quitButton.on("pointerup", () => {
            window.location.href = "https://eosphor.us";
        })

        /*quitButton.on("pointerout", () => {
            hoverImg.setVisible(false);
        })*/

    }
}