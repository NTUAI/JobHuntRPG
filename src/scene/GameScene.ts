import Phaser from 'phaser';
import { CST } from "../CST";
import { FadeUtils } from '../FadeUtils';
import { SpeechBubble } from '../SpeechBubble';
import { MessagePanel } from '../MessagePanel';
import { Controls } from '../Controls'; // Make sure the path is correct

export class GameScene extends Phaser.Scene {
  
  private activeRoom!: string;
  
  private changingScene: boolean = false;

  // environment images
  private ceo_room!: Phaser.GameObjects.Image;
  private hr_room!: Phaser.GameObjects.Image;
  private engineer_room!: Phaser.GameObjects.Image;
  private marketing_room!: Phaser.GameObjects.Image;
  
  // audio
  private music!: Phaser.Sound.BaseSound;
  private ship!: Phaser.Sound.BaseSound;

  // keyboard
  private controls!: Controls;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; // move up, left, down, right
  
  // sprites
  private player_sprite!: Phaser.Physics.Arcade.Sprite;
  private ceo_sprite!: Phaser.Physics.Arcade.Sprite;
  private hr_sprite!: Phaser.Physics.Arcade.Sprite;
  private marketing_sprite!: Phaser.Physics.Arcade.Sprite;
  private engineer_sprite!: Phaser.Physics.Arcade.Sprite;

  // other player-bound assets
  private shadow!: Phaser.Physics.Arcade.Sprite;
  private speechBubble!: ReturnType<typeof SpeechBubble.createSpeechBubble>;
  private messageBox!: MessagePanel;

  // xp and leveling
  private xp!: number;
  private xpBar!: Phaser.GameObjects.Image;
  private compass!: Phaser.GameObjects.Image;
  private level!: number;

  constructor() {
    super({ key: CST.SCENE.GAME });
    this.activeRoom = "CEO";
    this.xp = 0;
    this.level = 1;
  }

  preload(): void {} // this method isn't needed since the loading scene handles it

  create(): void {
    this.controls = new Controls(this);
    FadeUtils.fadeIn(this, 2000, (callback) => {
        console.log("CEO Scene activated")
    });

    this.ceo_room = this.add.image(0, 0, CST.IMAGE.CEO_ROOM).setOrigin(0).setDepth(0);
    this.hr_room = this.add.image(0, 0, CST.IMAGE.HR_ROOM).setOrigin(0).setDepth(0);
    this.engineer_room = this.add.image(0, 0, CST.IMAGE.ENGINEER_ROOM).setOrigin(0).setDepth(0);
    this.marketing_room = this.add.image(0, 0, CST.IMAGE.MARKETING_ROOM).setOrigin(0).setDepth(0);

    this.player_sprite = this.physics.add.sprite(250, 450, CST.IMAGE.PLAYER_SPRITE).setScale(0.25);
    this.ceo_sprite = this.physics.add.sprite(180, 300, CST.IMAGE.CEO_SPRITE).setScale(0.35);
    this.hr_sprite = this.physics.add.sprite(100, 200, CST.IMAGE.HR_SPRITE).setScale(0.25);
    this.marketing_sprite = this.physics.add.sprite(100, 500, CST.IMAGE.MARKETING_SPRITE).setScale(0.30);
    this.engineer_sprite = this.physics.add.sprite(500, 200, CST.IMAGE.ENGINEER_SPRITE).setScale(0.30);

    this.setRoom(this.activeRoom);

    this.game.canvas.style.cursor = `url('assets/images/cursor1.png'), default`;

    // character (temp, need to preload images once character sprite sheet is ready)

    // scene boundaries
    this.physics.world.setBounds(0, 0, 600, 600);
    this.player_sprite.setCollideWorldBounds(true);
    
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

    this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(600, 2, 198, 596);
    this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(2, 2, 596, 596);
    this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(0, 600, 600, 200);

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
      this.messageBox = new MessagePanel(this, "大家好，這是遠傳夢想號", "玩家");


      this.xpBar = this.add.image(605, 535, CST.IMAGE.XP).setOrigin(0).setDepth(0).setScale(0.23);
      this.add.text(610, 500, "XP: " + this.xp, { fontSize: '20px', color: '#FFFFFF' });
      this.add.text(610, 520, "Level: " + this.level), { fontSize: '20px', color: '#FFFFFF' };
      this.compass = this.add.image(55, 550, CST.IMAGE.COMPASS).setDepth(0).setScale(0.2);
    }

  toHR(): void {
    //this.sound.stopAll()
    FadeUtils.fadeOut(this, 2000, (callback) => {
        console.log("Switching from CEO sceen to HR scene")
        //this.scene.start(CST.SCENE.HR);
        //this.scene.stop(CST.SCENE.GAME);
        this.sound.stopAll();
    });
  }

  setRoom(newRoom: string): void {
    this.activeRoom = newRoom;
    switch(this.activeRoom) {
      case "CEO": 
        this.ceo_room.setVisible(true);
        this.hr_room.setVisible(false);
        this.engineer_room.setVisible(false);
        this.marketing_room.setVisible(false);
    
        this.ceo_sprite.setVisible(true);
        this.hr_sprite.setVisible(false);
        this.engineer_sprite.setVisible(false);
        this.marketing_sprite.setVisible(false);
        break;
      
      case "HR":
        this.ceo_room.setVisible(false);
        this.hr_room.setVisible(true);
        this.engineer_room.setVisible(false);
        this.marketing_room.setVisible(false);
    
        this.ceo_sprite.setVisible(false);
        this.hr_sprite.setVisible(true);
        this.engineer_sprite.setVisible(false);
        this.marketing_sprite.setVisible(false);
        break;

      case "Marketing":
        this.ceo_room.setVisible(false);
        this.hr_room.setVisible(false);
        this.engineer_room.setVisible(false);
        this.marketing_room.setVisible(true);
    
        this.ceo_sprite.setVisible(false);
        this.hr_sprite.setVisible(false);
        this.engineer_sprite.setVisible(false);
        this.marketing_sprite.setVisible(true);
        break;

      case "Engineering":
        this.ceo_room.setVisible(false);
        this.hr_room.setVisible(false);
        this.engineer_room.setVisible(true);
        this.marketing_room.setVisible(false);
    
        this.ceo_sprite.setVisible(true);
        this.hr_sprite.setVisible(false);
        this.engineer_sprite.setVisible(true);
        this.marketing_sprite.setVisible(false);
        break;
    }
  }

  updateSpeechBubblePosition(): void {

    if (this.speechBubble) {
      // Adjust these offsets to position the speech bubble correctly relative to your player sprite
      //const offsetX = -200; // This is just an example, adjust as needed
      //const offsetY = -340; // This is just an example, adjust as needed
      console.log("x: " + this.player_sprite.x + ", y: " + this.player_sprite.y);

      //this.speechBubble.setPosition(this.player_sprite.x /* + offsetX*/, this.player_sprite.y /*+ offsetY*/);
    }
  }

  update() {    
    this.handleKeyboard()
    //this.updateSpeechBubblePosition();

    if(this.player_sprite.y >= 550 && !this.changingScene) {
      //this.player.y = 0;
      this.player_sprite.setInteractive(false);
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

    this.player_sprite.setVelocityY(0)
    

    // go up
    if(this.controls.isDown('up') || this.controls.isDown('w')) {
      this.player_sprite.setVelocity(0, -speed);
    }
    
    // go down
    if(this.controls.isDown('down') || this.controls.isDown('s')) {
      this.player_sprite.setVelocity(0, speed);
    }

    //go left
    this.player_sprite.setVelocityX(0)
    if(this.controls.isDown('left') || this.controls.isDown('a')) {
      this.player_sprite.setVelocity(-speed, 0);
    }
    // go right
    if(this.controls.isDown('right') || this.controls.isDown('d')) {
      this.player_sprite.setVelocity(speed, 0);
    }

    // speech and interaction (chat bubble currently)
    /*if(this.controls.justDown('space')) {
      if (this.speechBubble) {
        this.speechBubble.destroy(); // or .setVisible(false) based on your implementation
      }
  
      // Calculate the speech bubble's position based on the player's current position
      const bubbleOffsetX = 0; // Adjust as needed
      const bubbleOffsetY = -this.player.displayHeight * this.player_sprite.scaleY; // Position above the player
      
      this.speechBubble = SpeechBubble.createSpeechBubble(
        this, 
        this.player_sprite.x, 
        this.player_sprite.y, 
        130, 
        50, 
        'This is a test speech bubble for FETRPG.'
      );    
    };*/

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