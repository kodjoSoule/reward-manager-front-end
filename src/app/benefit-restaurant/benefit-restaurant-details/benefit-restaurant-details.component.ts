// benefit-restaurant-details.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauBenefitRestaurant } from '../RestauBenefitRestaurant';
import { BenefitRestaurantService } from '../benefit-restaurant.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefit-restaurant-details',
  standalone: true,
  providers : [],
  imports : [CommonModule],
  templateUrl: './benefit-restaurant-details.component.html',
  styleUrls: ['./benefit-restaurant-details.component.css']
})
export class BenefitRestaurantDetailsComponent implements OnInit {
  // @Input() restaurant!: RestauBenefitRestaurant;
  restaurant!: RestauBenefitRestaurant;
  restaurantNumber!: number ;
  isLoading :Boolean = false;
  // @Input() merchant_number!: number;

  // constructor(private modalService: NgbModal) {}

  // close(): void {
  //   this.modalService.dismissAll();
  // }

  // restaurant!: RestauBenefitRestaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: BenefitRestaurantService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // Utilisez la propriété restaurantNumber pour récupérer la valeur du parent
    const merchantNumber = this.route.snapshot.params['merchant_number'];
    this.restaurantService.getRestaurantInfo(this.restaurantNumber).subscribe(
      (data: RestauBenefitRestaurant) => {
        this.restaurant = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching restaurant details:', error);
        // Gestion des erreurs, par exemple rediriger vers une page d'erreur
      }
    );
  }
  closeModal(): void {
    this.activeModal.close();
  }

  // Autres propriétés et méthodes si nécessaire
}
