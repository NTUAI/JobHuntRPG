import Phaser from 'phaser';
import { CST } from "../CST";
import { FadeUtils } from '../FadeUtils';
import { SpeechBubble } from '../SpeechBubble';

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
  private speechBubble: ReturnType<typeof SpeechBubble.createSpeechBubble> | null = null;

  constructor() {
    super({ key: CST.SCENE.CEO });
  }

  preload(): void {
    
  }

  create(): void {
    FadeUtils.fadeIn(this, 2000, (callback) => {
        console.log("Game Scene activated")
    });

    this.bg = this.add.tileSprite(256, 256, this.game.renderer.width, this.game.renderer.height, CST.IMAGE.CEO_ROOM)
    this.player = this.physics.add.sprite(250, 450, CST.IMAGE.PLAYER).setScale(0.2)

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // character (temp, need to preload images once character sprite sheet is ready)
    

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

  update() {    
    this.handleKeyboard()

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
    
        this.speechBubble = SpeechBubble.createSpeechBubble(this, this.player.x - 50, this.player.y - 120, 130, 50, 'This is a test speech bubble for EosRPG.');
    };

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

/*class MainMenu extends Phaser.Scene {
  constructor() {
      super({ key: 'MainMenu' });
  }

  preload() {
      // Preload assets for the menu (e.g., images, sounds)
  }

  create() {
      // Create title text, menu options, etc.
      this.add.text(100, 100, 'Main Menu', { font: '40px Arial', color: '#ffffff' });

      // Example of adding a start game option
      let startGameText = this.add.text(100, 200, 'Start Game', { font: '32px Arial', color: '#ffffff' });
      startGameText.setInteractive({ useHandCursor: true });
      startGameText.on('pointerdown', () => this.scene.start('Game')); // Assuming 'Game' is the key of your game scene
  }

  update() {
      // The main menu typically doesn't need to update anything continuously
  }
}*/