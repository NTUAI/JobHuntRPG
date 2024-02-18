import Phaser from "phaser";

export class MessagePanel {
    private scene: Phaser.Scene;
    private panel: Phaser.GameObjects.Graphics;
    private messages: Phaser.GameObjects.Text[] = [];
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private maxMessages: number = 20;

    constructor(scene: Phaser.Scene, message: string, sender: string) {
        this.scene = scene;
        this.x = 600;
        this.y = 0;
        this.width = 200;
        this.height = 600;

        this.panel = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } });  
        message = sender + "：" + message;
        this.addMessage(message);
        //this.panel.fillRect(x, y, width, height); // can adjust size and position
        
        // make the panel scrollable and make it able to display multiple messages
    }

    wrapChineseText(text) {
        let result = '';
        let lineLength = 0;
    
        // Iterate through each character in the text
        for (let char of text) {
            lineLength += 1;
            result += char;
            // If we reach the max line length, insert a line break
            if (lineLength >= 12) {
                result += '\n'; // Add a newline character to break the line
                lineLength = 0; // Reset the line length counter
            }
        }
    
        return result;
    }

    addMessage(message: string) {
        // If we already have the maximum number of messages, remove the first one
        if (this.messages.length >= this.maxMessages) {
            const removedMessage = this.messages.shift();
            removedMessage?.destroy(); // Remove the oldest message from the display
        }

        // Calculate the Y position of the new message
        // This places the new message at the bottom of the list
        const newY = this.y + 20 + (this.messages.length * 22); // Assuming a fixed line height for simplicity
        let newMessage = this.scene.add.text(this.x + 10, newY, this.wrapChineseText(message), { fontSize: '14px', color: '#FFFFFF' });

        this.messages.push(newMessage);

        // Update positions of all messages to accommodate the new message
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


/*import Phaser from "phaser";

export class MessagePanel {
    private scene: Phaser.Scene;
    private panel: Phaser.GameObjects.Graphics;
    private messages: Phaser.GameObjects.Text[] = [];
    private mask: Phaser.GameObjects.Graphics;
    private startY: number;
    private scrollOffset: number = 0;
    private maxHeight: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        this.scene = scene;
        this.startY = y;
        this.maxHeight = height;

        // Panel background
        this.panel = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } });
        this.panel.fillRect(x, y, width, height);

        // Mask for clipping text overflow
        this.mask = this.scene.add.graphics().fillRect(x, y, width, height);
        this.mask.createGeometryMask();

        // Enable input for scrolling
        this.scene.input.on('pointermove', (pointer, localX, localY, event) => {
            if (pointer.isDown) {
                this.scrollMessages(pointer.velocity.y);
            }
        });
    }

    /*addMessage(message: string, color: string = '#FFFFFF') {
        let yPosition = this.startY + this.messages.reduce((acc, msg) => acc + msg.height + 5, 0); // Calculate y based on existing messages
        let text = this.scene.add.text(0, yPosition, message, { fontSize: '14px', color: color, wordWrap: { width: 500 } });
        text.setMask(this.mask.geometryMask);
        this.messages.push(text);

        // Adjust scrollOffset if needed to keep showing the newest messages
        if (yPosition + text.height > this.startY + this.maxHeight) {
            this.scrollOffset -= text.height + 5; // Adjust this value as needed
            this.updateMessagePositions();
        }
    }*/
/*
    scrollMessages(velocityY: number) {
        this.scrollOffset += velocityY * 0.1; // Adjust scroll speed
        this.scrollOffset = Phaser.Math.Clamp(this.scrollOffset, -(this.messages.length * 20), 0); // Adjust clamping based on your content
        this.updateMessagePositions();
    }

    updateMessagePositions() {
        let currentY = this.startY + this.scrollOffset;
        this.messages.forEach(msg => {
            msg.setY(currentY);
            currentY += msg.height + 5; // Adjust spacing between messages
        });
    }

    // Show and hide methods remain the same
    public show() {}
    public hide() {}
}*/