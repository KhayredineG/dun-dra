class GameLogic {
  constructor(dmEngine) {
    this.dm = dmEngine;
    this.rules = {
      combat: {
        hitChance: 0.7,
        damageRange: [1, 10]
      },
      progression: {
        xpPerLevel: 1000,
        levelCap: 20
      }
    };
  }

  resolveCombat(attacker, defender) {
    const hitRoll = Math.random();
    if (hitRoll < this.rules.combat.hitChance) {
      const damage = Math.floor(
        Math.random() * (this.rules.combat.damageRange[1] - this.rules.combat.damageRange[0] + 1) +
          this.rules.combat.damageRange[0]
      );
      return { hit: true, damage };
    }
    return { hit: false };
  }

  calculateLevel(xp) {
    return Math.min(
      Math.floor(xp / this.rules.progression.xpPerLevel) + 1,
      this.rules.progression.levelCap
    );
  }

  applyQuestRewards(player, quest) {
    if (quest.rewards) {
      player.gold = (player.gold || 0) + (quest.rewards.gold || 0);
      player.xp = (player.xp || 0) + (quest.rewards.xp || 0);
      player.level = this.calculateLevel(player.xp);
    }
  }
}

module.exports = GameLogic;