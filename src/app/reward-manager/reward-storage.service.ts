// reward-storage.service.ts


// reward-storage.model.ts
export interface StoredReward {
  reward_confirmation_number: number;
  credit_card_number: string;
  // Ajoutez d'autres propriétés nécessaires
}


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RewardStorageService {


  constructor() {}
  private rewards: StoredReward[] = [];



  addReward(reward: StoredReward) {
    this.rewards.push(reward);
  }

  getRewards() {
    return this.rewards;
  }
  getLastReward(): StoredReward | undefined {
    // Retournez le dernier élément de la liste des récompenses
    return this.rewards.length > 0 ? this.rewards[this.rewards.length - 1] : undefined;
  }

  clearRewards() {
    this.rewards = [];
  }
}