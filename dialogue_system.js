class DialogueSystem {
  constructor(dmEngine) {
    this.dm = dmEngine;
    this.npcPersonalities = {};
  }

  generateDialoguePrompt(npcId, playerInput) {
    const npcState = this.dm.gameState.npcs[npcId] || {};
    return `Generate NPC dialogue response for ${npcId} with personality: ${JSON.stringify(npcState.personality)}. Player said: ${playerInput}`;
  }

  parseDialogueResponse(aiResponse) {
    return {
      response: aiResponse.response || "I have nothing to say.",
      options: aiResponse.options || [],
      affectsWorldState: aiResponse.affectsWorldState || {}
    };
  }

  async handleDialogue(npcId, playerInput) {
    const prompt = this.generateDialoguePrompt(npcId, playerInput);
    // In a real implementation, this would call an AI API
    const mockResponse = {
      response: "Ah, I see you're interested in the ancient artifact. It's hidden in the ruins north of here.",
      options: ["Ask about the ruins", "Ask about the artifact", "Leave conversation"],
      affectsWorldState: { knowsAboutRuins: true }
    };
    const result = this.parseDialogueResponse(mockResponse);
    this.dm.updateGameState({ npcs: { [npcId]: { lastDialogue: result } } });
    if (result.affectsWorldState) {
      this.dm.updateGameState({ worldState: result.affectsWorldState });
    }
    return result;
  }
}

module.exports = DialogueSystem;