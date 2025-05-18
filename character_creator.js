class CharacterCreator {
  constructor(dmEngine) {
    this.dm = dmEngine;
  }

  generateCharacterPrompt(playerInput) {
    return `Create a character based on: ${playerInput}. Current world state: ${JSON.stringify(this.dm.gameState.worldState)}`;
  }

  parseCharacterResponse(aiResponse) {
    return {
      name: aiResponse.name || "Adventurer",
      race: aiResponse.race || "Human",
      class: aiResponse.class || "Warrior",
      backstory: aiResponse.backstory || "A mysterious traveler",
      stats: aiResponse.stats || { strength: 10, dexterity: 10, intelligence: 10 }
    };
  }

  async createCharacter(playerInput) {
    try {
      const prompt = this.generateCharacterPrompt(playerInput);
      const config = require('./config');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.groqApiKey}`
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API');
      }
      
      const character = this.parseCharacterResponse(JSON.parse(data.choices[0].message.content));
      this.dm.initializeGame(character);
      return character;
    } catch (error) {
      console.error('Character creation failed:', error);
      throw error;
    }
  }
}

module.exports = CharacterCreator;