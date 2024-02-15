// Controls.ts
import Phaser from 'phaser';

export class Controls {
  //private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: { [key: string]: Phaser.Input.Keyboard.Key };
  
  constructor(private scene: Phaser.Scene) {
    this.keys = {
      one: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      two: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      three: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
      four: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
      w: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      shift: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
      esc: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    };
  }

  public isDown(key: string): boolean {
    if (this.keys[key]) {
      return this.keys[key].isDown;
    }
    return false;
  }

  public justDown(key: string): boolean {
    if (this.keys[key]) {
      return Phaser.Input.Keyboard.JustDown(this.keys[key]);
    }
    return false;
  }
}