import { CST } from "../CST";
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
        let playButton = this.add.image((this.game.renderer.width / 2) + 150, 80, CST.IMAGE.PLAY).setDepth(1).setScale(0.25);
        let optionsButton = this.add.image((this.game.renderer.width / 2) + 150, this.game.renderer.height / 2 - 100, CST.IMAGE.OPTIONS).setDepth(1).setScale(0.25);
        let quitButton = this.add.image((this.game.renderer.width / 2) + 150, this.game.renderer.height / 2 + 100, CST.IMAGE.QUIT).setDepth(1).setScale(0.25);
        let hoverImg = this.add.image(100, 100, CST.IMAGE.HOVER).setScale(0.4).setVisible(true);

        //create sprites (if using pixel art, remove sharpen)
        /*let hoverSprite: Phaser.GameObjects.Sprite = this.add.sprite(100, 100, CST.SPRITE.CAT);
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);*/

        //create audio, disable pauseonblur
        //this.sound.pauseOnBlur = false;
        //this.sound.play(CST.AUDIO.TITLE, {loop: true})

        //create animation

        /*
        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1, //repeat forever,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT, {
                frames: [0, 1, 2, 3]
            })
        });*/

        //make image buttons interactive
        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        playButton.setInteractive();

        /*playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;

        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })*/

        playButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY);
        })

        optionsButton.setInteractive();

        /*optionsButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = optionsButton.x - optionsButton.width;
            hoverSprite.y = optionsButton.y;

        })

        optionsButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })*/

        optionsButton.on("pointerup", () => {
            //this.scene.launch();
        })


        quitButton.setInteractive();
        quitButton.on("pointerup", () => {
            window.location.href = "https://eosphor.us";
        })

    }
}