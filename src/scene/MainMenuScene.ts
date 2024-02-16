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
        FadeUtils.fadeIn(this, 4000, (callback) => {
            console.log("MainMenuScene activated")
        });
        this.sound.add(CST.AUDIO.TITLE_AUDIO, { loop: true }).play();
        this.sound.add(CST.AUDIO.TITLE_MUSIC, { volume: 0.3, loop: true }).play();

        let graphics = this.add.graphics();
      

        //create images (z order)
        //this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.LOGO).setDepth(1);
        this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0).setDepth(0).setScale(0.60); // 600 x 600

        graphics.fillStyle(0x000000, 1); // The '1' is the alpha for full opacity
        graphics.fillRect(0, 512, 512, 200); // Fill a rectangle from (0, 512) to (512, 612)


        let playButton = this.add.image(700, 50, CST.IMAGE.PLAY).setDepth(1).setScale(0.55);
        let optionsButton = this.add.image(700, 150, CST.IMAGE.OPTIONS).setDepth(1).setScale(0.55);
        let quitButton = this.add.image(700, 250, CST.IMAGE.QUIT).setDepth(1).setScale(0.55);
        let hoverImg = this.add.image(100, 100, CST.IMAGE.HOVER).setScale(0.20).setVisible(false);

        //let board = this.add.image(180, 562, CST.IMAGE.BOARD).setDepth(1).setScale(0.8);
        let EosRPG = this.add.image(80, 85, CST.IMAGE.EOSRPG_LOGO).setDepth(1).setScale(0.4);
        let NTUAI_Button = this.add.image(100, 550, CST.IMAGE.NTUAI_LOGO).setDepth(1).setScale(0.25);
        //let FET_Button = this.add.image(300, 550, CST.IMAGE.FET_LOGO).setDepth(1).setScale(0.1);
        let ATCC_Button = this.add.image(300, 550, CST.IMAGE.ATCC_LOGO).setDepth(1).setScale(0.25);
        let FET_Button = this.add.image(500, 550, CST.IMAGE.FET_LOGO).setDepth(1).setScale(0.16);

        this.tweens.add({
            targets: NTUAI_Button,
            y: '-=10', // Moves up by 20 pixels
            ease: 'Sine.inOut', // Smooth transition for a natural floating effect
            duration: 2000, // Duration of one rise/fall cycle
            yoyo: true, // Automatically reverses the tween to create a up and down motion
            repeat: -1 // Infinite loop
        });

        this.tweens.add({
            targets: ATCC_Button,
            y: '-=15', // Moves up by 20 pixels
            ease: 'Sine.inOut', // Smooth transition for a natural floating effect
            duration: 2000, // Duration of one rise/fall cycle
            yoyo: true, // Automatically reverses the tween to create a up and down motion
            repeat: -1 // Infinite loop
        });

        this.tweens.add({
            targets: FET_Button,
            y: '-=20', // Moves up by 20 pixels
            ease: 'Sine.inOut', // Smooth transition for a natural floating effect
            duration: 2000, // Duration of one rise/fall cycle
            yoyo: true, // Automatically reverses the tween to create a up and down motion
            repeat: -1 // Infinite loop
        });

        this.tweens.add({
            targets: hoverImg, //your image that must spin
            rotation: 6.2831, //rotation value must be radian
            duration: 4000, //duration is in milliseconds
            repeat: -1
        });
    

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
            hoverImg.setX(playButton.x-140);
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

        this.add.graphics().fillStyle(0x000000, 0.2).fillCircle(80, 87, 83);
        this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(600, 0, 200, 600);
        this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(0, 0, 600, 600);
        this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(0, 600, 600, 200);

        // options button
        optionsButton.setInteractive();

        optionsButton.on("pointerover", () => {
            optionsButton.setX(optionsButton.x-10);
            hoverImg.setVisible(true);
            hoverImg.setX(optionsButton.x-140);
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

        let track, knob;

        // Create the slider track
        track = this.add.graphics()
            .fillStyle(0x555555, 1)
            .fillRect(400, 300, 150, 20);
    
        // Create the slider knob
        knob = this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillCircle(475, 310, 10)
            .setInteractive({ cursor: 'pointer' });
    
        // Make the knob draggable
        this.input.setDraggable(knob);
    
        // Define the drag behavior
        knob.on('drag', (pointer, dragX, dragY) => {
            // Constrain the knob to the track
            const minX = 400 + 10; // 10 is half the width of the knob for margin
            const maxX = 550 - 10; // Track width - half the width of the knob for margin
            dragX = Phaser.Math.Clamp(dragX, minX, maxX);
    
            // Update the knob's position
            knob.x = dragX;
    
            // Update the volume based on knob's position
            // Map the knob's position to a 0-1 range for volume
            const volume = Phaser.Math.Clamp((dragX - minX) / (maxX - minX), 0, 1);
            this.sound.volume = volume;
            console.log(`Volume set to: ${volume}`);
        });
    
        // Enable dragging
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
        });

        })


        // quit button
        quitButton.setInteractive();
        quitButton.on("pointerover", () => {
            quitButton.setX(quitButton.x-10);
            hoverImg.setVisible(true);
            hoverImg.setX(quitButton.x-140);
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


        // NTUAI button
        NTUAI_Button.setInteractive();

        NTUAI_Button.on("pointerover", () => {
            NTUAI_Button.setScale(0.28);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        NTUAI_Button.on("pointerout", () => {
            NTUAI_Button.setScale(0.25);
        })

        NTUAI_Button.on("pointerup", () => {
            window.open("https://ntuai.club", "_blank");
        })


        // Eosphorus button
        ATCC_Button.setInteractive();

        ATCC_Button.on("pointerover", () => {
            ATCC_Button.setScale(0.28);
            this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
        })

        ATCC_Button.on("pointerout", () => {
            ATCC_Button.setScale(0.25);
        })

        ATCC_Button.on("pointerup", () => {
            window.open("https://atcc.co/21statcc/", "_blank");
        })



         // FET button
         FET_Button.setInteractive();

         FET_Button.on("pointerover", () => {
             FET_Button.setScale(0.19);
             this.sound.add(CST.AUDIO.SELECT, {volume: 1}).play();
         })
 
         FET_Button.on("pointerout", () => {
             FET_Button.setScale(0.16);
         })
 
         FET_Button.on("pointerup", () => {
             window.open("https://www.fetnet.net/", "_blank");
         })

    }
}