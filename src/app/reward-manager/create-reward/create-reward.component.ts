import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RewardManagerService } from '../reward-manager.service';
import { BenefitRestaurantService } from '../../benefit-restaurant/benefit-restaurant.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-reward',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './create-reward.component.html',
  styleUrl: './create-reward.component.css'
})
export class CreateRewardComponent {
  newReward: any = {};
  restaurants: any[] = []; // Assurez-vous que le type correspond à la structure de vos données de restaurant
  credit_card_number!: number ;
  dining_amount! : number ;
  merchant_number ! : number ;


  constructor(
    private rewardManagerService: RewardManagerService,
    private benefitRestaurantService: BenefitRestaurantService,
    private router : Router
  ) {}

  ngOnInit(): void {
    // Chargez la liste des restaurants lors de l'initialisation du composant
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.benefitRestaurantService.getAllRestaurants().subscribe(
      (response) => {
        this.restaurants = response;

      },
      (error) => {
        console.error('Erreur lors du chargement des restaurants', error);
      }
    );
  }

  createReward() {
    // Assurez-vous que newReward contient les données nécessaires (nom, montant, merchant_number)
    this.newReward.credit_card_number;
    this.newReward.number ;
    this.newReward.dining_amount;
    this.newReward.merchant_number;

    this.rewardManagerService.createReward(this.newReward).subscribe(
      (response) => {
        alert('Récompense créée avec succès'+response);
        // Rediriger vers la liste des récompenses après la création
        // this.router.navigate(['/reward-manager']);
      },
      (error) => {
        alert('Erreur lors de la création de la récompense'+ error);
      }
    );
  }
}