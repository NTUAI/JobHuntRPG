import Phaser from 'phaser';
import { CST } from "../CST";
import { FadeUtils } from '../FadeUtils';
import { SpeechBubble } from '../SpeechBubble';
import { MessagePanel } from '../MessagePanel';
import { Controls } from '../Controls';

export class GameScene extends Phaser.Scene {
  
  private messageQueue: { message: string; sender: string }[] = [];
  private isDisplayingMessage: boolean = false;

  private activeRoom!: number;
  
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
  private messageBox!: MessagePanel;

  private ceo_bubble!: ReturnType<typeof SpeechBubble.createSpeechBubble>;
  private player_bubble!: ReturnType<typeof SpeechBubble.createSpeechBubble>;

  // xp and leveling
  private xp!: number;
  private xpBar!: Phaser.GameObjects.Image;
  private level!: number;

  private player_shadow!: Phaser.GameObjects.Graphics;
  private ceo_shadow!: Phaser.GameObjects.Graphics;
  private hr_shadow!: Phaser.GameObjects.Graphics;
  private marketing_shadow!: Phaser.GameObjects.Graphics;
  private engineer_shadow!: Phaser.GameObjects.Graphics;

  private compass!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: CST.SCENE.GAME });
    this.activeRoom = 0;
    this.xp = 0;
    this.level = 1;
  }

  preload(): void {} // this method isn't needed since the loading scene handles it

  
  create(): void {
    let graphics = this.add.graphics();
    this.controls = new Controls(this);
    FadeUtils.fadeIn(this, 2000, (callback) => {
        console.log("GameScene activated")
    });

    this.ceo_room = this.add.image(0, 0, CST.IMAGE.CEO_ROOM).setOrigin(0).setDepth(0);
    this.hr_room = this.add.image(0, 0, CST.IMAGE.HR_ROOM).setOrigin(0).setDepth(0);
    this.engineer_room = this.add.image(0, 0, CST.IMAGE.ENGINEER_ROOM).setOrigin(0).setDepth(0);
    this.marketing_room = this.add.image(0, 0, CST.IMAGE.MARKETING_ROOM).setOrigin(0).setDepth(0);

    this.ceo_shadow = this.add.graphics().fillStyle(0x000000, 0.6).fillEllipse(180, 370, 60, 20);
    this.ceo_sprite = this.physics.add.sprite(180, 300, CST.IMAGE.CEO_SPRITE).setScale(0.35);
    //SpeechBubble.createSpeechBubble(this, this.ceo_sprite.x, this.ceo_sprite.y, 100, 50);

    this.hr_shadow = this.add.graphics().fillStyle(0x000000, 0.6).fillEllipse(155, 510, 65, 20);
    this.hr_sprite = this.physics.add.sprite(150, 430, CST.IMAGE.HR_SPRITE).setScale(0.25);

    this.marketing_shadow = this.add.graphics().fillStyle(0x000000, 0.6).fillEllipse(350, 220, 60, 20);
    this.marketing_sprite = this.physics.add.sprite(350, 150, CST.IMAGE.MARKETING_SPRITE).setScale(0.30);

    this.engineer_shadow = this.add.graphics().fillStyle(0x000000, 0.6).fillEllipse(500, 267, 60, 20);
    this.engineer_sprite = this.physics.add.sprite(500, 200, CST.IMAGE.ENGINEER_SPRITE).setScale(0.30);

    this.player_shadow = this.add.graphics().fillStyle(0x000000, 0.6).fillEllipse(250, 550, 60, 20);
    this.player_sprite = this.physics.add.sprite(250, 450, CST.IMAGE.PLAYER_SPRITE).setScale(0.25);

    this.game.canvas.style.cursor = `url('assets/images/cursor1.png'), default`;

    // character (temp, need to preload images once character sprite sheet is ready)

    // scene boundaries
    //this.physics.world.setBounds(100, 100, 500, 500);
    //this.player_sprite.setCollideWorldBounds(true);
    
    // ship sound effects
    this.ship = this.sound.add(CST.AUDIO.GAME_AUDIO, { loop: true });
    this.ship.play();

    // background music
    this.music = this.sound.add(CST.AUDIO.GAME_MUSIC, { loop: true, volume: 0.3 });
    this.music.play();

    this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(600, 2, 198, 596);
    this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(2, 2, 596, 596);
    this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(0, 600, 600, 200);
    //this.add.graphics().lineStyle(5, 0x5C4033, 1).strokeRect(600, 548, 198, 48);
    this.add.graphics({ lineStyle: { width: 5, color: 0x5C4033 } }).lineBetween(600, 510, 800, 510).setDepth(100);

    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D});


      graphics.fillStyle(0x000000, 1); // The '1' is the alpha for full opacity
      //graphics.fillRect(0, 512, 512, 100); // Fill a rectangle from (0, 512) to (512, 612)
      this.messageBox = new MessagePanel(this);
      this.setRoom(this.activeRoom);

      this.xpBar = this.add.image(605, 535, CST.IMAGE.XP).setOrigin(0).setDepth(0).setScale(0.23);
      this.add.text(610, 515, "XP: " + this.xp + " ｜ " + "Level: " + this.level, { fontSize: '18px', color: '#FFFFFF' });
      // this.add.text(610, 520, "Level: " + this.level), { fontSize: '20px', color: '#FFFFFF' };
      this.compass = this.add.image(55, 550, CST.IMAGE.COMPASS).setDepth(0).setScale(0.2);



      let chatData = this.cache.json.get(CST.CHAT.CEO);
      const ceoChat = chatData.CEOChat;

      ceoChat.forEach((message, index) => {
        console.log(`Message ${index + 1}:`, message.text);
        this.messageBox.addMessage(message.text, message.speaker);
        // Display the text in the game (example coordinates; adjust as needed)
        //this.add.text(100, 100 + index * 20, message.text, { font: '16px Arial', fill: '#ffffff' });
    });

      // Example: Display the first message
      //let firstMessage = chatData[0].text;
      //console.log(firstMessage);
      
      //this.messageBox.addMessage(firstMessage.text, "CEO");
      //this.add.text(100, 100, firstMessage.text, { font: '16px Arial', fill: '#ffffff' });
  
      // If the message has a URL, make it clickable
      /*if (firstMessage.url) {
          this.add.text(100, 120, 'Click here for more info', { font: '16px Arial', fill: '#00ff00' })
              .setInteractive()
              .on('pointerdown', () => window.open(firstMessage.url, '_blank'));
      }*/

    }

  setRoom(newRoom: number): void {
    this.activeRoom = newRoom;
    switch(this.activeRoom) {
      case 0: // CEO
        this.messageBox.addMessage("你現在在CEO房間", "系統");
        this.ceo_room.setVisible(true);
        this.hr_room.setVisible(false);
        this.engineer_room.setVisible(false);
        this.marketing_room.setVisible(false);
    
        this.ceo_sprite.setVisible(true);
        this.hr_sprite.setVisible(false);
        this.engineer_sprite.setVisible(false);
        this.marketing_sprite.setVisible(false);

        this.ceo_shadow.setVisible(true);
        this.hr_shadow.setVisible(false);
        this.marketing_shadow.setVisible(false);
        this.engineer_shadow.setVisible(false);

        break;
      
      case 1: // HR
        this.messageBox.addMessage("你現在在人資房間", "系統");
        this.ceo_room.setVisible(false);
        this.hr_room.setVisible(true);
        this.engineer_room.setVisible(false);
        this.marketing_room.setVisible(false);
    
        this.ceo_sprite.setVisible(false);
        this.hr_sprite.setVisible(true);
        this.engineer_sprite.setVisible(false);
        this.marketing_sprite.setVisible(false);

        this.ceo_shadow.setVisible(false);
        this.hr_shadow.setVisible(true);
        this.marketing_shadow.setVisible(false);
        this.engineer_shadow.setVisible(false);

        break;

      case 2: // marketing
        this.messageBox.addMessage("你現在在行銷房間", "系統");
        this.ceo_room.setVisible(false);
        this.hr_room.setVisible(false);
        this.engineer_room.setVisible(false);
        this.marketing_room.setVisible(true);
    
        this.ceo_sprite.setVisible(false);
        this.hr_sprite.setVisible(false);
        this.engineer_sprite.setVisible(false);
        this.marketing_sprite.setVisible(true);

        this.ceo_shadow.setVisible(false);
        this.hr_shadow.setVisible(false);
        this.marketing_shadow.setVisible(true);
        this.engineer_shadow.setVisible(false);

        break;

      case 3: // engineer
        this.messageBox.addMessage("你現在在工程師房間", "系統");
        this.ceo_room.setVisible(false);
        this.hr_room.setVisible(false);
        this.engineer_room.setVisible(true);
        this.marketing_room.setVisible(false);
    
        this.ceo_sprite.setVisible(false);
        this.hr_sprite.setVisible(false);
        this.engineer_sprite.setVisible(true);
        this.marketing_sprite.setVisible(false);

        this.ceo_shadow.setVisible(false);
        this.hr_shadow.setVisible(false);
        this.marketing_shadow.setVisible(false);
        this.engineer_shadow.setVisible(true);

        break;
    }
  }

/*  updateSpeechBubblePosition(): void {

    if(this.player_bubble) {
      // Adjust these offsets to position the speech bubble correctly relative to your player sprite
      //const offsetX = -200; // This is just an example, adjust as needed
      //const offsetY = -340; // This is just an example, adjust as needed
      console.log("x: " + this.player_sprite.x + ", y: " + this.player_sprite.y);

      //this.speechBubble.setPosition(this.player_sprite.x, this.player_sprite.y);
    }
  }*/

  update() {

    this.handleKeyboard()
    //this.updateSpeechBubblePosition();

    if(this.player_sprite.y >= 500 && this.activeRoom <= 3) {
      //this.player_sprite.setInteractive(false);
      this.activeRoom += 1;
      this.setRoom(this.activeRoom);
      this.player_sprite.y = 100;
      //FadeUtils.fadeOut(this, 1000);
    }

    else if(this.player_sprite.y <= 80 && this.activeRoom >= 0) {
      this.activeRoom -= 1;
      this.setRoom(this.activeRoom);
      this.player_sprite.y = 480;
      //FadeUtils.fadeOut(this, 1000);
    }
  }

  handleKeyboard() {
    let speed = this.controls.isDown('shift') ? 250 : 150;

    // input 1
    if(this.controls.justDown('one')) {
      console.log("one pressed");
      this.messageBox.addMessage("你選了 1", "玩家");
    }

    // input 2
    if(this.controls.justDown('two')) {
      console.log("two pressed");
      this.messageBox.addMessage("你選了 2", "玩家");
    }

    // input 3
    if(this.controls.justDown('three')) {
      console.log("three pressed");
      this.messageBox.addMessage("你選了 3", "玩家");
    }

    //input 4
    if(this.controls.justDown('four')) {
      console.log("four pressed");
      this.messageBox.addMessage("你選了 4", "玩家");
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
    this.player_sprite.setVelocityX(0);
    if(this.controls.isDown('left') || this.controls.isDown('a')) {
      this.player_sprite.setVelocity(-speed, 0);
    }
    // go right
    if(this.controls.isDown('right') || this.controls.isDown('d')) {
      this.player_sprite.setVelocity(speed, 0);
    }

    this.player_shadow.x = this.player_sprite.x;
    this.player_shadow.y = this.player_shadow.y + 50;


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