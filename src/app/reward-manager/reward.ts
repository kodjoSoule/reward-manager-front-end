// // reward.model.ts
// export interface Reward {
//     id: number;
//     name: string;
//     description: string;
//     amount: number;
//     // Ajoutez d'autres propriétés si nécessaire
//   }


export interface Reward {
  id: number;
  reward_confirmation_number: number;
  // reward_amount: number;
  merchant_number: number;
  // reward_date: string;
  credit_card_number: string;
  dining_amount: number;
  dining_date: string;
  // Ajoutez d'autres propriétés si nécessaire
}
// reward.ts

// export interface Reward {
//   id: number;
//   credit_card_number: string;
//   merchant_number: number;
//   dining_amount: number;
//   dining_date: string;
// }
