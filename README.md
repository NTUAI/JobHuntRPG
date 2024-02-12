# EosRPG - Eosphorus Pirate Game

An RPG that lets you discover about [Eosphorus](https://eosphor.us), our project submission to Far East Telecom's co-hosted competition with [ATCC 2023](https://atcc.co/21statcc/).

EosRPG is a Phaser 3 TypeScript web app game that is linked directly to our website.

- *main.ts* initializes the core game configuration and scenes, setting up the Phaser game environment with arcade physics and a pixel art style.
- *CST.ts* defines constants for scene identifiers, asset paths (images and audio), and sprite keys, serving as a centralized resource reference for the game.
- *FadeUtils.ts* provides utility functions for smooth scene transitions, offering fadeIn and fadeOut effects that enhance the visual experience of transitioning between game scenes.
- *SpeechBubble.ts* crafts customizable speech bubbles for in-game dialogue, dynamically generating them with tailored positioning, sizing, and text content.
- Scenes
    - *MainMenuScene.ts* orchestrates the game's main menu, integrating interactive buttons for navigation, audio management, and a floating logo effect, setting the stage for player interaction.
    - *OptionsScene.ts* provides a user interface for audio settings, featuring an interactive volume slider that allows players to adjust the game's sound levels.
    - *LoadingScene.ts* meticulously handles the preloading of game assets, including images and audio, while displaying a loading progress bar to inform players as assets are being loaded.
    - *CEOScene.ts* crafts an immersive office environment for the CEO level.
    - *HRScene.ts* transitions the player to the HR office setting.


### Requirements

### Available Commands

| Command | Description |
|---------|-------------|
| `yarn install --frozen-lockfile` | Install project dependencies |
| `yarn start` | Build project and open web server running project |
| `yarn build` | Builds code bundle for production |
| `yarn lint` | Uses ESLint to lint code |

### Deployment