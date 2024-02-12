import { CST } from "../CST";
export class OptionsScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENE.OPTIONS});
    }

    create() {
    // Create a volume icon
    let volumeIcon = this.add.image(50, 50, 'volumeIcon'); // Assuming 'volumeIcon' is preloaded

    // Create a slider background
    let sliderBg = this.add.graphics();
    sliderBg.fillStyle(0xaaaaaa, 1);
    sliderBg.fillRect(70, 45, 100, 10);

    // Create a slider
    let slider = this.add.graphics();
    slider.fillStyle(0xffffff, 1);
    slider.fillRect(70, 45, 50, 10); // Initial volume at 50%

    // Enable input on the slider
    slider.setInteractive(new Phaser.Geom.Rectangle(70, 45, 100, 10), Phaser.Geom.Rectangle.Contains);
    this.input.setDraggable(slider);

    // Drag event listener
    slider.on('drag', (pointer, dragX, dragY) => {
        // Ensure dragX is within the sliderBg bounds
        dragX = Phaser.Math.Clamp(dragX, 70, 170);
        slider.clear().fillStyle(0xffffff, 1).fillRect(70, 45, dragX - 70, 10);

        // Adjust volume based on slider position
        let volume = (dragX - 70) / 100;
        this.sound.volume = volume;
    });
    }

}