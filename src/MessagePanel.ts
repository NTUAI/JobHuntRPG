import Phaser from "phaser";

//let linkText = this.add.text(100, 100, 'Click Here', { fill: '#0000FF' });
//this.makeInteractive(linkText, 'https://erecruit.fareastone.com.tw/zh_TW/web/guest/-2');

// three colours for different types of messages
// FETNET: #E72410
// Player: #FFFFFF (the two colours of FETNET are white and red)
// System: #964B00
// URL: #0000EE


export class MessagePanel {
    private scene: Phaser.Scene;
    private panel: Phaser.GameObjects.Graphics;
    private messages: Phaser.GameObjects.Text[] = [];
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private maxMessages: number = 20;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.x = 600;
        this.y = 0;
        this.width = 200;
        this.height = 600;

        this.panel = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } });          
    }

    truncateString(str: string, maxLength: number = 11): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }

    return str;
  }

    addMessage(message: string, sender: string) {
        // If we already have the maximum number of messages, remove the first one
        if(this.messages.length >= this.maxMessages) {
            const removedMessage = this.messages.shift();
            removedMessage?.destroy(); // Remove the oldest message from the display
        }

        let updated_message = sender + "：" + message;

        let colour = "#000000"; // default of black
        if(sender == "玩家") {
            colour = "#FFFFFF"; // player
        }
        else if(sender == "CEO" || sender == "人資" || sender == "資訊" || sender == "行銷") {
            colour = "#E72410"; // CEO
        }
        else if(sender == "系統") {
            colour = "#5C4033";
        }
        else if(sender == "URL") {
            console.log("Yoyoyo");
            colour = "#0000EE";
        }
        else {
            console.log("Invalid sender");
        }
        

        // Calculate the Y position of the new message
        // This places the new message at the bottom of the list
        const newY = this.y + 20 + (this.messages.length * 22); // Assuming a fixed line height for simplicity
        let newMessage = this.scene.add.text(this.x + 10, newY, this.truncateString(updated_message), { fontSize: '14px', color: colour });

        if(sender == "URL") {
            console.log("message for URL: " + message);
            newMessage.setInteractive( {useHandCursor: true});
            newMessage.on('pointerdown', () => window.open(message, '_blank'));
        }

        this.messages.push(newMessage);
        this.updateMessagesPosition();
    }
    

    // Method to update the position of all messages to keep them within the panel
    private updateMessagesPosition() {
        this.messages.forEach((msg, index) => {
            const newY = this.y + 16 + (index * 22); // Recalculate Y position based on index
            msg.setY(newY);
        });
    }
}