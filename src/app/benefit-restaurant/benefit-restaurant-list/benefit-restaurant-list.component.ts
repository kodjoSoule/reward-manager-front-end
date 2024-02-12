import { Component, OnInit } from '@angular/core';
import { BenefitRestaurantService } from '../benefit-restaurant.service';
import { RestauBenefitRestaurant } from '../RestauBenefitRestaurant';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-benefit-restaurant-list',
  standalone: true,
  imports: [
    RouterModule, DatePipe, CommonModule,
  ],
  providers: [BenefitRestaurantService],
  templateUrl: './benefit-restaurant-list.component.html',
  styleUrl: './benefit-restaurant-list.component.css'
})
export class BenefitRestaurantListComponent  implements OnInit {
  restaurants: RestauBenefitRestaurant[] = [
    {
      id: 1,
      merchant_number: 232,
      name: 'Kayser House',
      benefit_percentage: 20.0,
      benefit_availability_policy: 'allowed'
    },
  ];

  constructor(private benefitRestaurantService: BenefitRestaurantService) {}

  ngOnInit(): void {
    //this.loadRestaurants();
    this.loadRestaurantsTest();
  }
  loadRestaurantsTest2() {
    // Simulation de données pour le test
    const testData: RestauBenefitRestaurant[] = [
      {
        id: 1,
        merchant_number: 232,
        name: 'Kayser House',
        benefit_percentage: 20.0,
        benefit_availability_policy: 'allowed'
      },
      {
        id: 2,
        merchant_number: 112,
        name: 'Madiba Coffee Shop',
        benefit_percentage: 15.0,
        benefit_availability_policy: 'not_allowed'
      }
      // Ajoutez d'autres données de test au besoin
    ];

    // Affectez les données de test à la propriété restaurants
    this.restaurants = testData;
  }
  loadRestaurantsTest() {
    // Simulation de données pour le test
    const testData: RestauBenefitRestaurant[] = [];

    for (let i = 1; i <= 50; i++) {
      const restaurant: RestauBenefitRestaurant = {
        id: i,
        merchant_number: 1000 + i,
        name: `Restaurant ${i}`,
        benefit_percentage: Math.random() * 30, // Pourcentage aléatoire entre 0 et 30
        benefit_availability_policy: i % 2 === 0 ? 'allowed' : 'not_allowed'
      };

      testData.push(restaurant);
    }

    // Affectez les données de test à la propriété restaurants
    this.restaurants = testData;
  }

  loadRestaurants() {
    this.benefitRestaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateAvailability(merchantNumber: number, availability: string) {
    this.benefitRestaurantService
      .updateAvailability(merchantNumber, availability)
      .subscribe(
        (data) => {
          console.log('Benefit availability updated.');
          // Refresh the list after updating availability
          this.loadRestaurants();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}