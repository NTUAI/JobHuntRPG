import Phaser from 'phaser';


const AssetKeys = {
  BACKGROUND: 'BACKGROUND',
  MUSIC: 'MUSIC',
  SHIP: 'SHIP',
  PLAYER: 'PLAYER'
}

export class GameScene extends Phaser.Scene {
  private bg!: Phaser.GameObjects.TileSprite;
  private player!: Phaser.Physics.Arcade.Sprite;
  // environment images
  // private fg!: Phaser.GameObjects.TileSprite;
  
  // audio
  private music!: Phaser.Sound.BaseSound;
  private ship!: Phaser.Sound.BaseSound;

  // keyboard
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spacebar!: Phaser.Input.Keyboard.Key;
  private shift!: Phaser.Input.Keyboard.Key;
  private w!: Phaser.Input.Keyboard.Key;
  private a!: Phaser.Input.Keyboard.Key;
  private s!: Phaser.Input.Keyboard.Key;
  private d!: Phaser.Input.Keyboard.Key;
  
  // character
  // private circle!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'Game' });
    //super('LoadingScene')
  }

  preload(): void {
    // images
    this.load.image(AssetKeys.BACKGROUND, 'assets/room7_50.jpg')
    //this.load.image(AssetKeys.PLAYER, 'assets/player.png')

    // audio
    this.load.audio(AssetKeys.SHIP, 'assets/audio/ship.mp3')
    this.load.audio(AssetKeys.MUSIC, 'assets/audio/celtic.mp3')

    // keyboard
    //this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.);
  }

  create(): void {
    const { width, height } = this.scale;
    this.bg = this.add.tileSprite(256, 256, width, height, AssetKeys.BACKGROUND)
    this.player = this.physics.add.sprite(100, 400, "player")

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    //this.createSpeechBubble(this.player.x, this.player.y, 100, 50, 'This is a test speech bubble for EosRPG.');

    // character (temp, need to preload images once character sprite sheet is ready)
    /*
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(200, 200, 10); // x, y, radius
    graphics.generateTexture('dynamicCircle', 100, 100)
    this.circle = this.add.sprite(100, 100, 'dynamicCircle');
    */

    // scene boundaries
    this.physics.world.setBounds(50, 80, width-80, height-115);
    this.player.setCollideWorldBounds(true);
    
    // ship sound effects
    this.ship = this.sound.add(AssetKeys.SHIP, { loop: true });
    this.ship.play();

    // background music
    this.music = this.sound.add(AssetKeys.MUSIC, { loop: true, volume: 0.3 });
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

  createSpeechBubble(x, y, w, h, text) {
    const bubbleWidth = w;
    const bubbleHeight = h;
    const bubblePadding = 10;
    const arrowHeight = bubbleHeight / 4;

    const bubble = this.add.graphics({ x: x, y: y });
    
    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(bubbleWidth / 7);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 2);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 7);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    const content = this.add.text(0, 0, text, { fontFamily: 'Arial', fontSize: '20', color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

    const b = content.getBounds();

    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
  } 

  update() {    

    this.handleKeyboard()

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
      this.createSpeechBubble(this.player.x - 50, this.player.y - 80, 100, 50, 'This is a test speech bubble for EosRPG.')
    };

    // ESC input
    

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