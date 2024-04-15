// benefit-restaurant-item.component.ts

import { Component, Input, OnInit, inject } from '@angular/core';
import { RestauBenefitRestaurant } from '../RestauBenefitRestaurant';
import { Router, RouterModule } from '@angular/router';
import { BenefitRestaurantDetailsComponent } from '../benefit-restaurant-details/benefit-restaurant-details.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-benefit-restaurant-item',
  standalone: true,
  providers : [NgModel],
  imports: [ RouterModule, DatePipe,CommonModule, RouterModule, ],
  templateUrl: './benefit-restaurant-item.component.html',
  styleUrls: ['./benefit-restaurant-item.component.css']
})
export class BenefitRestaurantItemComponent implements OnInit {
  @Input() restaurant!: RestauBenefitRestaurant;

  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {

  }
  // Autres propriétés et méthodes si nécessaire
// router = inject(Router);
viewDetails(): void {
  // alert(this.restaurant.merchant_number)
  const modalRef = this.modalService.open(BenefitRestaurantDetailsComponent, { centered: true });
  modalRef.componentInstance.restaurantNumber = this.restaurant.merchant_number;
  modalRef.componentInstance.restaurant = this.restaurant;
  console.log(this.restaurant.merchant_number);
  // modalRef.componentInstance.restaurant = this.restaurant;
}
updateAvailability(): void {
//   this.router.navigateByUrl(`/products/${this.product._id}`, { state: { product: this.product } });
}

onMouseOver(): void {
  // Fonction exécutée lorsque la souris survole l'élément
  console.log("La souris survole l'élément.");
  // Vous pouvez ajouter ici d'autres actions à exécuter lors du survol
}

onMouseOut(): void {
  // Fonction exécutée lorsque la souris quitte l'élément
  console.log("La souris quitte l'élément.");
  // Vous pouvez ajouter ici d'autres actions à exécuter lorsque la souris quitte
}

}




