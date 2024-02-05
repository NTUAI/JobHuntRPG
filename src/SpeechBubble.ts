import Phaser from "phaser";

export class SpeechBubble {
    static createSpeechBubble(scene: Phaser.Scene, x: number, y: number, w: number, h: number, text: string): Phaser.GameObjects.Container {
        const bubbleWidth = w;
        const bubbleHeight = h;
        const bubblePadding = 10;
        const arrowHeight = bubbleHeight / 4;

        const bubble = scene.add.graphics();

        // Bubble shadow
        bubble.fillStyle(0x222222, 0.5);
        bubble.fillRoundedRect(x + 6, y + 6, bubbleWidth, bubbleHeight, 16);

        // Bubble color
        bubble.fillStyle(0xffffff, 1);

        // Bubble outline line style
        bubble.lineStyle(4, 0x565656, 1);

        // Bubble shape and outline
        bubble.strokeRoundedRect(x, y, bubbleWidth, bubbleHeight, 16);
        bubble.fillRoundedRect(x, y, bubbleWidth, bubbleHeight, 16);

        // Calculate arrow coordinates
        const point1X = x + Math.floor(bubbleWidth / 7);
        const point1Y = y + bubbleHeight;
        const point2X = x + Math.floor((bubbleWidth / 7) * 2);
        const point2Y = y + bubbleHeight;
        const point3X = x + Math.floor(bubbleWidth / 7);
        const point3Y = y + Math.floor(bubbleHeight + arrowHeight);

        // Bubble arrow shadow
        bubble.lineStyle(4, 0x222222, 0.5);
        bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

        // Bubble arrow fill
        bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
        bubble.lineStyle(2, 0x565656, 1);
        bubble.lineBetween(point2X, point2Y, point3X, point3Y);
        bubble.lineBetween(point1X, point1Y, point3X, point3Y);

        // Add text content to the bubble
        const content = scene.add.text(0, 0, text, { fontFamily: 'Arial', fontSize: '12px', color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
        content.setPosition(x + (bubbleWidth / 2) - (content.width / 2), y + (bubbleHeight / 2) - (content.height / 2));

        // Group bubble and text together using a container
        const container = scene.add.container(0, 0, [bubble, content]);
        container.setSize(bubbleWidth, bubbleHeight);
        container.setPosition(x, y); // Set the position of the container, which moves all contained elements

        return container; // Return the container with both the graphics and the text
    }
}