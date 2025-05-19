# DunDra - AI-Powered Dungeon Game

DunDra is an interactive web-based dungeon game that uses AI to create dynamic character stories and game experiences. The game features a character creation system, quest generation, and an intelligent dialogue system powered by the Groq API.

## Features

- AI-powered character creation system
- Dynamic quest generation
- Interactive dialogue system
- Real-time character stats tracking
- Grid-based game interface

## Prerequisites

- Node.js (Latest LTS version recommended)
- Groq API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dun-dra.git
cd dun-dra
```

2. Install dependencies:
```bash
npm install
```

3. Create a `config.js` file in the root directory with your Groq API key:
```javascript
module.exports = {
  groqApiKey: 'your-api-key-here'
};
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Open the game in your browser (the development server will provide the URL)
2. Create your character by entering a name and concept
3. The AI will generate a unique character with stats and backstory
4. Interact with the game world through the dialogue system
5. Complete quests and earn rewards

## Project Structure

- `index.html` - Main game interface and layout
- `character_creator.js` - AI-powered character generation system
- `dm_engine.js` - Game state and world management
- `game_logic.js` - Core game mechanics
- `dialogue_system.js` - Interactive dialogue management
- `quest_generator.js` - Dynamic quest creation system

## Development

The project uses Vite for development and building. Available commands:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Security Note

Never commit your `config.js` file containing the API key. Make sure it's included in your `.gitignore` file.