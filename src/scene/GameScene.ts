import Phaser from 'phaser';
import { CST } from "../CST";
import { FadeUtils } from '../FadeUtils';
import { SpeechBubble } from '../SpeechBubble';
import { MessagePanel } from '../MessagePanel';
import { Controls } from '../Controls';

export class GameScene extends Phaser.Scene {

  private enterEvent!: Phaser.Time.TimerEvent;
  private goDown!: Phaser.Time.TimerEvent;

  private displayDownArrow!: boolean;

  private activeMessage!: number;

  private enterFlag!: boolean;

  private name!: string; // 3
  private age!: string; // 5
  private school!: string; // 8
  private major!: string; // 9
  private grade!: string; // 10
  private skills!: string; // 12
  private goals!: string; // 14
  private contents!: string; // 16
  private motivation!: string; //18

  private messageQueue: { message: string; sender: string }[] = [];
  private isDisplayingMessage: boolean = false;

  private complete!: boolean;

  private activeRoom!: number;
  private finished!: boolean;

  private downArrow!: Phaser.GameObjects.Image;
  
  private changingScene: boolean = false;

  // environment images
  private ceo_room!: Phaser.GameObjects.Image;
  private hr_room!: Phaser.GameObjects.Image;
  private engineer_room!: Phaser.GameObjects.Image;
  private marketing_room!: Phaser.GameObjects.Image;
  private instructions!: Phaser.GameObjects.Image;
  
  // audio
  private music!: Phaser.Sound.BaseSound;
  private ship!: Phaser.Sound.BaseSound;

  private spaceFlag!: boolean;
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
  private xpText!: Phaser.GameObjects.Text;

  private player_shadow!: Phaser.GameObjects.Graphics;
  private ceo_shadow!: Phaser.GameObjects.Graphics;
  private hr_shadow!: Phaser.GameObjects.Graphics;
  private marketing_shadow!: Phaser.GameObjects.Graphics;
  private engineer_shadow!: Phaser.GameObjects.Graphics;

  private compass!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: CST.SCENE.GAME });
    this.activeRoom = CST.LEVEL.HR;
    this.xp = 0;
    this.level = 1;
    this.activeMessage = 0;
    this.enterFlag = true;
    this.spaceFlag = true;
    this.complete = false;

    this.name = "";
    this.age = "";
    this.school = "";
    this.grade = "";
    this.skills = "";
    this.major = "";
    this.goals = "";
    this.contents = "";
    this.motivation = "";
  }

  preload(): void {

  } // this method isn't needed since the loading scene handles it

  
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
    this.physics.world.setBounds(70, 0, 500, 600);
    this.player_sprite.setCollideWorldBounds(true);
    
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

    
    graphics.fillStyle(0x000000, 1); // The '1' is the alpha for full opacity
    //graphics.fillRect(0, 512, 512, 100); // Fill a rectangle from (0, 512) to (512, 612)
    this.messageBox = new MessagePanel(this);
    this.setRoom(this.activeRoom);

    this.xpBar = this.add.image(605, 535, CST.IMAGE.XP).setOrigin(0).setDepth(0).setScale(0.23);
    this.xpText = this.add.text(610, 515, "XP: " + this.xp + " ｜ " + "Level: " + this.level, { fontSize: '18px', color: '#FFFFFF' });
    this.compass = this.add.image(55, 550, CST.IMAGE.COMPASS).setDepth(0).setScale(0.2);

    this.downArrow = this.add.image(300, 500, CST.IMAGE.DOWN_ARROW).setDepth(0).setScale(0.2);
    this.tweens.add({
      targets: this.downArrow,
      alpha: 0,               // Target transparency
      ease: 'Linear',        // Linear easing for a smooth transition
      duration: 1000,        // Duration of fade
      repeat: -1,            // Repeat indefinitely
      yoyo: true,            // Go back to the original state (visible)
    });
    this.downArrow.setVisible(false);

    /*console.log("testing ... ");

    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    } else {
      Notification.requestPermission().then((permission: NotificationPermission) => {
          if (permission === "granted") {
            this.showNotification();
          }
        });
      }*/
      this.enterEvent = this.time.addEvent({
        delay: 2000, // Delay in milliseconds (3000ms = 3 seconds)
        callback: () => {
          // Call your specific function here
          this.messageBox.addMessage("按 ↵Enter", "系統");
      },
        callbackScope: this, // The scope in which to call the function
        loop: true // Set to true to call the function repeatedly
    });
    this.chatSystem();
  }

  showNotification(): void {
    //alert("Testingidasodifnwoqiejafoi sjefio ");
    const notificationOptions: NotificationOptions = {
      body: "Here is the notification body",
      icon: "/assets/images/ATCC_Logo.png"
    };
    
    const notification: Notification = new Notification("Notification Title", notificationOptions);
  
    notification.onclick = () => {
      window.open("https://example.com");
    };
  }

  ensureInput(a: string) {
    let userInput;  
    do {
      userInput = prompt(a);
    } while (userInput === null || userInput.trim() === "");

    return userInput;
  }


  chatSystem() {

    this.messageBox.addMessage("麻煩按 ↵Enter", "系統");

    // CEO chat
    let ceoData = this.cache.json.get(CST.CHAT.CEO);
    const ceoChat = ceoData.CEOChat;

    // HR chat
    let hrData = this.cache.json.get(CST.CHAT.HR);
    const hrChat = hrData.HRChat;

    // Engineering chat
    let engineeringData = this.cache.json.get(CST.CHAT.ENGINEERING);
    const engineeringChat = engineeringData.EngineeringChat;

    // Marketing chat
    let marketingData = this.cache.json.get(CST.CHAT.MARKETING);
    const marketingChat = marketingData.MarketingChat;
 
    /*ceoChat.forEach((message, index) => {
      console.log(`Message ${index + 1}:`, message.text);
      this.messageBox.addMessage(message.text, message.speaker);
    });*/
 
     this.input.keyboard.on('keydown-ENTER', () => {
      this.enterEvent.remove();
      this.enterFlag = false;
      if((this.activeRoom == CST.LEVEL.CEO && this.activeMessage < ceoChat.length) 
      || (this.activeRoom == CST.LEVEL.HR && this.activeMessage < hrChat.length)
      || (this.activeRoom == CST.LEVEL.INFORMATION && this.activeMessage < engineeringChat.length)
      || (this.activeRoom == CST.LEVEL.MARKETING && this.activeMessage < marketingChat.length)) {
        switch(this.activeRoom) {
          case CST.LEVEL.CEO: // CEO
            alert(ceoChat[this.activeMessage].speaker + ": " + ceoChat[this.activeMessage].text);
            this.messageBox.addMessage(ceoChat[this.activeMessage].text, ceoChat[this.activeMessage].speaker);
            break;
          case CST.LEVEL.HR: // HR
            this.messageBox.addMessage(hrChat[this.activeMessage].text, hrChat[this.activeMessage].speaker);
            switch(this.activeMessage) {
              case 3: // name
                this.name = this.ensureInput("我的名字是...");
                break;
              case 5: // age
                this.age = this.ensureInput("我的年齡是...");
                break;
              case 7: // school
                this.school = this.ensureInput("我的學校是...")+"";
                break;
              case 8: // major
                this.major = this.ensureInput("我的科系是...")+"";
                break;
              case 9: // year
                this.grade = this.ensureInput("我的年級是...")+"";
                alert("人資：啊，所以你叫" + this.name + "\n然後你現在是" + this.age + "歲的" + this.school + " " + this.major + " " + this.grade + "年級。\n謝謝您提供的資訊！");
                break;
              case 11: // professional skills
                this.skills = this.ensureInput("（選擇題，選擇專業技能：行銷與客戶關係管理、(1)人力資源、(2)財務、(3)專案管理、(4)資訊工程（包括前端開發、後端開發、網通技術)、(5)業務、(6)其他營運）")+"";
                break;
              case 13: // professional goals
                this.goals = this.ensureInput("（玩家選擇職業目標）：(1) 開創新的項目團隊、(2) 成為專業領域的專家、(3) 在舊有領導職位一路高升")+"";
                break;
              case 15: // job description
                this.contents = this.ensureInput("以下職場工作內容你最在意哪三個呢？ (輸入兩個代碼: 如【1、2、4】\n(1) 錢和福利、(2) 升遷管道、(3) 工作上的挑戰與成長、(4) work - life balance、(5) 培訓與教育訓練、(6) 公司氛圍與文化")+"";
                break;
              case 17: // application motivation
                this.motivation = this.ensureInput("根據你的認知你是以下哪兩個原因想加入遠傳呢？ (輸入兩個代碼: 如【1、2】)\n(1) 敏捷辦公室很漂亮、(2) 很多好福利、(3) 工作上的挑戰與創新鼓勵、(4) 可以遠距上班、(5) 培訓與教育訓練多、(6) 公司氛圍與文化感覺不錯、(7)注重 ESG、(8)其他")+"";
                break;
              default:
                alert(hrChat[this.activeMessage].speaker + ": " + hrChat[this.activeMessage].text);
                break;
            }
            break;
          case CST.LEVEL.INFORMATION: // Engineering
            alert(engineeringChat[this.activeMessage].speaker + ": " + engineeringChat[this.activeMessage].text);
            this.messageBox.addMessage(engineeringChat[this.activeMessage].text, engineeringChat[this.activeMessage].speaker);
            break;
          case CST.LEVEL.MARKETING: // Marketing
            alert(marketingChat[this.activeMessage].speaker + ": " + marketingChat[this.activeMessage].text);
            this.messageBox.addMessage(marketingChat[this.activeMessage].text, marketingChat[this.activeMessage].speaker);
            break;
          default:
            console.log("Something has gone wrong with the activeRoom number...");
        }
        this.activeMessage++; // move to the next message
        this.leveling();
      }

      // go to active room
      if(this.activeRoom == CST.LEVEL.HR && this.activeMessage == hrChat.length) {
        alert("人資：以下為你的個人帳號資訊\n\n名字: " + this.name + "\n年齡: " + this.age + "\n學校: " + this.school + "\n科系: " + this.major + "\n專業技能: " + this.skills +"\n\ 職業目標: " + this.goals + "\n工作內容: " + this.contents + "\n申請動機: " + this.motivation);
        console.log("INFORMATION");
        console.log("人資：以下為你的個人帳號資訊\n\n名字: " + this.name + "\n年齡: " + this.age + "\n學校: " + this.school + "\n科系: " + this.major + "\n專業技能: " + this.skills +"\n\ 職業目標: " + this.goals + "\n工作內容: " + this.contents + "\n申請動機: " + this.motivation);
        this.activeMessage++;
        this.downArrow.setVisible(true);
        this.complete = true;
      }
      else if(this.activeRoom == CST.LEVEL.INFORMATION && this.activeMessage == engineeringChat.length) {
        this.activeMessage++;
        this.downArrow.setVisible(true);
        this.complete = true;
      }
      else if(this.activeRoom == CST.LEVEL.MARKETING && this.activeMessage == marketingChat.length) {
        this.activeMessage++;
        this.downArrow.setVisible(true);
        this.complete = true;
      }
      else if(this.activeRoom == CST.LEVEL.CEO && this.activeMessage == ceoChat.length) {
        alert("Game complete");
        let a = this.sound.add(CST.AUDIO.TITLE_START, {volume: 1});
        this.sound.stopAll();
        a.play();

        const fadeDuration = 5000; // 1 second

        // Start fading to black. The color is specified in hex (0xRRGGBB). 0x000000 is black.
        FadeUtils.fadeOut(this, 5000, (callback) => {
            console.log("Game ending");
            this.scene.start(CST.SCENE.MENU);
        });
      }
     });

    this.instructions = this.add.image(0, 0, CST.IMAGE.INSTRUCTIONS).setOrigin(0).setDepth(0);
    this.instructions.setVisible(true);

  }

  leveling() {
    this.xp++;
    if((this.xp > 5 && this.level == 1)
    || (this.xp > 8 && this.level == 2)
    || (this.xp > 12 && this.level == 3)
    || (this.xp > 17 && this.level == 4)
    || (this.xp > 23 && this.level == 5)
    || this.xp > 31 && this.level == 6) {
      this.level++;
      this.xp = 0;
    }
    this.xpText.setText("XP：" + this.xp + " ｜ " + "Level：" + this.level);
  }

  setRoom(newRoom: number): void {
    if(newRoom >= 1 && newRoom <= 3) {
      this.downArrow.setVisible(false);
      this.complete = false;
    }
    this.activeRoom = newRoom;
    this.activeMessage = 0;
    switch(this.activeRoom) {
      case CST.LEVEL.CEO: // CEO
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
      
      case CST.LEVEL.HR: // HR
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

      case CST.LEVEL.INFORMATION: // engineer
        this.messageBox.addMessage("你現在在資訊房間", "系統");
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

      case CST.LEVEL.MARKETING: // marketing
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


    if(this.activeRoom >= 0 && this.activeRoom <= 2) {
      if(this.player_sprite.y >= 500 && this.complete) {
        //this.player_sprite.setInteractive(false);
        this.activeRoom += 1;
        this.setRoom(this.activeRoom);
        if(this.activeRoom == 3) {
          this.player_sprite.y = 700;
        } else {
          this.player_sprite.y = 100;
        }
        //FadeUtils.fadeOut(this, 1000);
      }
    }
  }

  handleKeyboard() {
    let speed = this.controls.isDown('shift') ? 250 : 150;

    // space
    if(this.controls.justDown('space')) {
      console.log("space pressed");
      this.instructions.setVisible(false);
    }

    // input 1
    if(this.controls.justDown('one')) {
      console.log("one pressed");
      this.messageBox.addMessage("你選了 1", "系統");
    }

    // input 2
    if(this.controls.justDown('two')) {
      console.log("two pressed");
      this.messageBox.addMessage("你選了 2", "系統");
    }

    // input 3
    if(this.controls.justDown('three')) {
      console.log("three pressed");
      this.messageBox.addMessage("你選了 3", "系統");
    }

    //input 4
    if(this.controls.justDown('four')) {
      console.log("four pressed");
      this.messageBox.addMessage("你選了 4", "系統");
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