import Phaser from 'phaser';
import { CST } from "../CST";
import { FadeUtils } from '../FadeUtils';
import { SpeechBubble } from '../SpeechBubble';
import { MessagePanel } from '../MessagePanel';

export class CEOScene extends Phaser.Scene {
  // environment images
  private bg!: Phaser.GameObjects.TileSprite;
  
  // audio
  private music!: Phaser.Sound.BaseSound;
  private ship!: Phaser.Sound.BaseSound;

  // keyboard
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; // move up, left, down, right
  private w!: Phaser.Input.Keyboard.Key; // move up
  private a!: Phaser.Input.Keyboard.Key; // move left
  private s!: Phaser.Input.Keyboard.Key; // move down
  private d!: Phaser.Input.Keyboard.Key; // move right
  private spacebar!: Phaser.Input.Keyboard.Key; // chat / interact
  private shift!: Phaser.Input.Keyboard.Key; // sprint
  private esc!: Phaser.Input.Keyboard.Key; // return to main menu
  
  // character
  private player!: Phaser.Physics.Arcade.Sprite;
  private speechBubble!: ReturnType<typeof SpeechBubble.createSpeechBubble>;
  private messageBox!: MessagePanel;

  constructor() {
    super({ key: CST.SCENE.CEO });
    //this.messageBox = new MessagePanel(this, 100, 100, 200, 300, "Insadfiqwiefwiuh we fiaf i");
  }

  preload(): void {} // this method isn't needed since the loading scene handles it

  create(): void {
    FadeUtils.fadeIn(this, 2000, (callback) => {
        console.log("CEO Scene activated")
    });

    this.bg = this.add.tileSprite(256, 256, this.game.renderer.width, 512, CST.IMAGE.CEO_ROOM)
    this.player = this.physics.add.sprite(250, 450, CST.IMAGE.PLAYER).setScale(0.2)

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // character (temp, need to preload images once character sprite sheet is ready)
    
    //this.messageBox = new MessagePanel(this, 0, 400, 200, 300, "大家好，我是");

    // scene boundaries
    //this.physics.world.setBounds(50, 80, this.game.renderer.width-80, this.game.renderer.width-115);
    //this.player.setCollideWorldBounds(true);
    
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
      graphics.fillRect(0, 512, 512, 100); // Fill a rectangle from (0, 512) to (512, 612)
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
      const offsetX = -200; // This is just an example, adjust as needed
      const offsetY = -340; // This is just an example, adjust as needed
      
      this.speechBubble.setPosition(this.player.x + offsetX, this.player.y + offsetY);
    }
  }

  update() {    
    this.handleKeyboard()
    this.updateSpeechBubblePosition();

    if(this.player.y >= this.renderer.height) {
      this.player.y = 0;
      this.player.setInteractive(false);
      this.toHR();
    }
  }

  handleKeyboard() {
    
    let speed = this.shift.isDown ? 250 : 150;

    // run
    if(this.shift.isDown) {
      speed = 250;
    }

    this.player.setVelocityY(0)
    

    // go up
    if(this.cursors.up.isDown || this.w.isDown) {
      this.player.setVelocity(0, -speed);
    }
    
    // go down
    if(this.cursors.down.isDown || this.s.isDown) {
      this.player.setVelocity(0, speed);
    }

    //go left
    this.player.setVelocityX(0)
    if(this.cursors.left.isDown || this.a.isDown) {
      this.player.setVelocity(-speed, 0);
    }
    // go right
    if(this.cursors.right.isDown || this.d.isDown) {
      this.player.setVelocity(speed, 0);
    }

    // speech and interaction (chat bubble currently)
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
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
    if(this.esc.isDown) {
        this.sound.stopAll();
        this.scene.start(CST.SCENE.MENU);
    }

    // if the user presses ESC, overlay the menu
    // menu: Resume, Sound, Exit
    // if the user presses ESC again, then get rid of the overlay
  }
}