import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BenefitRestaurantService } from '../benefit-restaurant.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestauBenefitRestaurant } from '../RestauBenefitRestaurant';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { InfoModalComponent } from '../../component/info-modal/info-modal.component';
import { ErrorModalComponent } from '../../component/error-modal/error-modal.component';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent implements OnInit{
  @Output() restaurantAdded: EventEmitter<void> = new EventEmitter<void>();

  newRestaurant: RestauBenefitRestaurant = {
    id :0 ,
    merchant_number: 0,
    name: '',
    benefit_percentage: 0,
    benefit_availability_policy : ''
  };

  constructor(
    private restaurantService: BenefitRestaurantService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) {}
  ngOnInit(): void {
  }
// Méthode pour fermer le formulaire modal
closeModal(): void {
  this.activeModal.close();
}

  addRestaurant() {
    this.restaurantService.addRestaurant(this.newRestaurant).subscribe(
      (response) => {
        console.log('Restaurant ajouté avec succès', response);
        // Réinitialiser le formulaire après l'ajout
        this.newRestaurant = {
          id : 0,
          merchant_number : 0,
          name: '',
          benefit_percentage: 0,
          benefit_availability_policy: ''
        };
        this.restaurantAdded.emit(); // Émettre l'événement après l'ajout
        // Fermer la modal si vous utilisez NgbModal
        this.modalService.dismissAll();



      },
      (error) => {
        console.error('Erreur lors de l\'ajout du restaurant', error);
        this.restaurantAdded.emit(); // Émettre l'événement après l'ajout
      }
    );


  }
}