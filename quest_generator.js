class QuestGenerator {
  constructor(dmEngine) {
    this.dm = dmEngine;
  }

  generateQuestPrompt(playerInput) {
    // Generate a prompt for the AI based on game state and player input
    return `Generate a quest based on: ${playerInput}. Current world state: ${JSON.stringify(this.dm.gameState.worldState)}`;
  }

  parseQuestResponse(aiResponse) {
    // Parse AI response into structured quest data
    return {
      title: aiResponse.title || "Mysterious Quest",
      description: aiResponse.description || "An adventure awaits!",
      objectives: aiResponse.objectives || [],
      rewards: aiResponse.rewards || {}
    };
  }

  async generateQuest(playerInput) {
    const prompt = this.generateQuestPrompt(playerInput);
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
    const data = await response.json();
    return this.parseQuestResponse(JSON.parse(data.choices[0].message.content));
  }
}

module.exports = QuestGenerator;