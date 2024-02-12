// benefit-restaurant-item.component.ts

import { Component, Input, inject } from '@angular/core';
import { RestauBenefitRestaurant } from '../RestauBenefitRestaurant';
import { Router } from '@angular/router';


@Component({
  selector: 'app-benefit-restaurant-item',
  standalone: true,
  imports: [],
  templateUrl: './benefit-restaurant-item.component.html',
  styleUrls: ['./benefit-restaurant-item.component.css']
})
export class BenefitRestaurantItemComponent {
  @Input() restaurant!: RestauBenefitRestaurant;

  // Autres propriétés et méthodes si nécessaire


router = inject(Router);
viewDetails(): void {
//   this.router.navigateByUrl(`/products/${this.product._id}`, { state: { product: this.product } });
}
updateAvailability(): void {
//   this.router.navigateByUrl(`/products/${this.product._id}`, { state: { product: this.product } });
}
}
