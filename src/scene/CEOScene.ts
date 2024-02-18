import Phaser from 'phaser';
import { CST } from "../CST";
import { FadeUtils } from '../FadeUtils';
import { SpeechBubble } from '../SpeechBubble';
import { MessagePanel } from '../MessagePanel';
import { Controls } from '../Controls'; // Make sure the path is correct

export class CEOScene extends Phaser.Scene {
  private changingScene: boolean = false;

  // environment images
  private bg!: Phaser.GameObjects.Image;
  
  // audio
  private music!: Phaser.Sound.BaseSound;
  private ship!: Phaser.Sound.BaseSound;

  // keyboard
  private controls!: Controls;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; // move up, left, down, right
  
  // character
  private player!: Phaser.Physics.Arcade.Sprite;
  private speechBubble!: ReturnType<typeof SpeechBubble.createSpeechBubble>;
  private messageBox!: MessagePanel;

  // xp and leveling
  private xp!: number;
  private xpBar!: Phaser.GameObjects.Image;
  private compass!: Phaser.GameObjects.Image;
  private level!: number;

  constructor() {
    super({ key: CST.SCENE.CEO });
    this.xp = 0;
    this.level = 1;
  }

  preload(): void {} // this method isn't needed since the loading scene handles it

  create(): void {
    this.controls = new Controls(this);
    FadeUtils.fadeIn(this, 2000, (callback) => {
        console.log("CEO Scene activated")
    });

    //this.bg = this.add.tileSprite(256, 256, this.game.renderer.width, this.game.renderer.height, CST.IMAGE.CEO_ROOM)
    this.bg = this.add.image(0, 0, CST.IMAGE.CEO_ROOM).setOrigin(0).setDepth(0).setScale(1.2);
    this.player = this.physics.add.sprite(250, 450, CST.IMAGE.PLAYER).setScale(0.2)

    this.game.canvas.style.cursor = `url('assets/images/cursor1.png'), default`;

    // character (temp, need to preload images once character sprite sheet is ready)

    // scene boundaries
    this.physics.world.setBounds(0, 0, 600, 600);
    this.player.setCollideWorldBounds(true);
    
    // ship sound effects
    this.ship = this.sound.add(CST.AUDIO.GAME_AUDIO, { loop: true });
    this.ship.play();

    // background music
    this.music = this.sound.add(CST.AUDIO.GAME_MUSIC, { loop: true, volume: 0.3 });
    this.music.play();
    /*// Start music on user interaction
    this.input.once('pointerdown', () => {
      this.music.play();
    });*/

    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D});


      let graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 1); // The '1' is the alpha for full opacity
      //graphics.fillRect(0, 512, 512, 100); // Fill a rectangle from (0, 512) to (512, 612)
      this.messageBox = new MessagePanel(this, 620, 0, 200, 600, "大家好，這是遠傳夢想號");


      this.xpBar = this.add.image(0, 512, CST.IMAGE.XP).setOrigin(0).setDepth(0).setScale(0.22);
      this.add.text(0, 570, "XP: " + this.xp, { fontSize: '20px', color: '#FFFFFF' });
      this.add.text(0, 590, "Level: " + this.level), { fontSize: '20px', color: '#FFFFFF' };
      this.compass = this.add.image(550, 550, CST.IMAGE.COMPASS).setDepth(0).setScale(0.2);
    }
  // this was for updating the background
  /*update(time: number, delta: number): void {
    this.bg.tilePositionX;
  } */

  toHR(): void {
    //this.sound.stopAll()
    FadeUtils.fadeOut(this, 2000, (callback) => {
        console.log("Switching from CEO sceen to HR scene")
        this.scene.start(CST.SCENE.HR);
        this.scene.stop(CST.SCENE.CEO);
        this.sound.stopAll();
    });
  }

  updateSpeechBubblePosition(): void {
    if (this.speechBubble) {
      // Adjust these offsets to position the speech bubble correctly relative to your player sprite
      //const offsetX = -200; // This is just an example, adjust as needed
      //const offsetY = -340; // This is just an example, adjust as needed
      console.log("x: " + this.player.x + ", y: " + this.player.y);

      this.speechBubble.setPosition(this.player.x /* + offsetX*/, this.player.y /*+ offsetY*/);
    }
  }

  update() {    
    this.handleKeyboard()
    this.updateSpeechBubblePosition();

    if(this.player.y >= 550 && !this.changingScene) {
      //this.player.y = 0;
      this.player.setInteractive(false);
      this.changingScene = true;
      this.toHR();
    }
  }

  handleKeyboard() {
    let speed = this.controls.isDown('shift') ? 250 : 150;

    // input 1
    if(this.controls.justDown('one')) {
      console.log("one pressed");
      this.messageBox.addMessage("你按了 1");
    }

    // input 2
    if(this.controls.justDown('two')) {
      console.log("two pressed");
      this.messageBox.addMessage("你按了 2");
    }

    // input 3
    if(this.controls.justDown('three')) {
      console.log("three pressed");
      this.messageBox.addMessage("你按了 3");
    }

    //input 4
    if(this.controls.justDown('four')) {
      console.log("four pressed");
      this.messageBox.addMessage("你按了 4");
    }

    // run
    if(this.controls.isDown('shift')) {
      speed = 250;
    }

    this.player.setVelocityY(0)
    

    // go up
    if(this.controls.isDown('up') || this.controls.isDown('w')) {
      this.player.setVelocity(0, -speed);
    }
    
    // go down
    if(this.controls.isDown('down') || this.controls.isDown('s')) {
      this.player.setVelocity(0, speed);
    }

    //go left
    this.player.setVelocityX(0)
    if(this.controls.isDown('left') || this.controls.isDown('a')) {
      this.player.setVelocity(-speed, 0);
    }
    // go right
    if(this.controls.isDown('right') || this.controls.isDown('d')) {
      this.player.setVelocity(speed, 0);
    }

    // speech and interaction (chat bubble currently)
    if(this.controls.justDown('space')) {
      if (this.speechBubble) {
        this.speechBubble.destroy(); // or .setVisible(false) based on your implementation
      }
  
      // Calculate the speech bubble's position based on the player's current position
      const bubbleOffsetX = 0; // Adjust as needed
      const bubbleOffsetY = -this.player.displayHeight * this.player.scaleY; // Position above the player
      
      this.speechBubble = SpeechBubble.createSpeechBubble(
        this, 
        this.player.x + bubbleOffsetX, 
        this.player.y + bubbleOffsetY, 
        130, 
        50, 
        'This is a test speech bubble for EosRPG.'
      );    };

    // ESC input
    if(this.controls.isDown('esc')) {
        this.sound.stopAll();
        this.scene.start(CST.SCENE.MENU);
    }

    // if the user presses ESC, overlay the menu
    // menu: Resume, Sound, Exit
    // if the user presses ESC again, then get rid of the overlay
  }
}