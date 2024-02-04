import {CST} from "../CST";
export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.LOAD});
    }

    init() {}

    loadImages() {
        this.load.setPath("../assets/images");
        for (let prop in CST.IMAGE) {
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }

    loadAudio() {
        this.load.setPath("../assets/audio");
        for (let prop in CST.AUDIO) {
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }

    /*loadSprites(frameConfig?: Phaser.Loader.FileTypes.ImageFrameConfig) {
        this.load.setPath("./assets/sprite");

        for (let prop in CST.SPRITE) {
            //@ts-ignore
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }*/

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    preload() {
        /*this.load.spritesheet("anna", "./assets/sprite/anna.png", {frameHeight: 64, frameWidth: 64});
        //load atlases
        this.load.atlas("characters", "./assets/sprite/characters.png", "./assets/sprite/characters.json")
        this.load.atlas("daze", "./assets/sprite/daze.png", "./assets/sprite/daze.json")
        this.load.spritesheet("rapier", "./assets/sprite/WEAPON_rapier.png", {frameHeight: 192, frameWidth: 192});*/

        //load images, audio, spritesheets
        this.loadImages();
        this.loadAudio();
        /*this.loadSprites({
            frameHeight: 32,
            frameWidth: 32
        });*/

        //create loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x000000 //white
            }
        })

        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */
        this.load.on("progress", (percent: number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(""+ percent);
        })

        this.add.image(0, 0, '../assets/images/loading.png');
        this.add.text(20, this.renderer.height / 2, 'Loading...', { font: '40px Arial', color: '#a9a9a9' });
        
        //simulate large load
        for(let i = 0; i < 100; i++){
            this.load.image('./assets/images/player.png')
        }

        this.load.on("complete", () => {
            this.scene.start(CST.SCENES.MENU);
        });

        this.load.on("load", (file: Phaser.Loader.File) => {
            console.log(file.src)
        })
    }

    create(): void {
        
    }
}