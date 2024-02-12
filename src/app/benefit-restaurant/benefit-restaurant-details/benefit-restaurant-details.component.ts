// benefit-restaurant-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauBenefitRestaurant } from '../RestauBenefitRestaurant';
import { BenefitRestaurantService } from '../benefit-restaurant.service';

@Component({
  selector: 'app-benefit-restaurant-details',
  templateUrl: './benefit-restaurant-details.component.html',
  styleUrls: ['./benefit-restaurant-details.component.css']
})
export class BenefitRestaurantDetailsComponent implements OnInit {
  restaurant!: RestauBenefitRestaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: BenefitRestaurantService
  ) {}

  ngOnInit() {
    const merchantNumber = this.route.snapshot.params['merchantNumber'];
    this.restaurantService.getRestaurantInfo(merchantNumber).subscribe(
      (data: RestauBenefitRestaurant) => {
        this.restaurant = data;
      },
      error => {
        console.error('Error fetching restaurant details:', error);
        // Gestion des erreurs, par exemple rediriger vers une page d'erreur
      }
    );
  }

  // Autres propriétés et méthodes si nécessaire
}
