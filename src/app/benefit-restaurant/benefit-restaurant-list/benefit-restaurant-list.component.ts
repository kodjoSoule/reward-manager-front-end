import { Component, OnInit } from '@angular/core';
import { BenefitRestaurantService } from '../benefit-restaurant.service';
import { RestauBenefitRestaurant } from '../RestauBenefitRestaurant';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { BenefitRestaurantItemComponent } from '../benefit-restaurant-item/benefit-restaurant-item.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-benefit-restaurant-list',
  standalone: true,
  imports: [
    RouterModule, DatePipe, CommonModule,
  BenefitRestaurantItemComponent,NgxPaginationModule,NgxUiLoaderModule
  ],
  providers: [BenefitRestaurantService],
  templateUrl: './benefit-restaurant-list.component.html',
  styleUrl: './benefit-restaurant-list.component.css'
})

export class BenefitRestaurantListComponent implements OnInit {
  loading: boolean = true;
  p: number = 1;
  filteredRestaurants: RestauBenefitRestaurant[] = [];
  restaurants: RestauBenefitRestaurant[] = [];

  errorMessage: string = '';

  constructor(private benefitRestaurantService: BenefitRestaurantService,
    private ngxLoader : NgxUiLoaderService
    ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.loadRestaurants();
    // this.loadRestaurantsTest();
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
    this.loading = false; // Set loading to false after data is loaded
  }

  loadRestaurants() {
    this.benefitRestaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        this.loading = false; // Set loading to false after data is loaded

      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Error loading restaurants: ' + error.error;
        this.loading = false; // Set loading to false in case of error
      },
      ()=>{
        this.ngxLoader.stop();
      }
    );
  }

  updateAvailability(merchantNumber: number, availability: string) {
    this.benefitRestaurantService
      .updateAvailability(merchantNumber, availability)
      .subscribe(
        (data) => {
          console.log('Benefit availability updated.');
          this.loadRestaurants(); // Refresh the list after updating availability
        },
        (error) => {
          console.log(error);
        },
        ()=>{
          this.ngxLoader.stop();
        }
      );
  }
}
