
import { Component, OnInit } from '@angular/core';
import { BenefitRestaurantService } from '../../benefit-restaurant.service';
import { RestauBenefitRestaurant } from '../../RestauBenefitRestaurant';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRestaurantComponent } from '../../add-restaurant/add-restaurant.component';
import { ErrorModalComponent } from '../../../component/error-modal/error-modal.component';
import { InfoModalComponent } from '../../../component/info-modal/info-modal.component';
import { ViewTauxRestaurantComponent } from '../../view-taux-restaurant/view-taux-restaurant.component';

@Component({
  selector: 'app-admin-benefit-restaurant-list',
  standalone: true,
  providers : [BenefitRestaurantService],
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './admin-benefit-restaurant-list.component.html',
  styleUrl: './admin-benefit-restaurant-list.component.css'
})
export class AdminBenefitRestaurantListComponent {

  // handleOperationResult(result: { type: 'success' | 'error', message: string }) {
  //   if (result.type === 'success') {
  //     this.openInfoModal('Succès', result.message);
  //   } else {
  //     this.openErrorModal('Erreur', result.message);
  //   }


  showInfoModal(title : string, message: string) {
      const modalRef = this.modalService.open(InfoModalComponent, { centered: true });
    modalRef.componentInstance.title = title ;
    modalRef.componentInstance.message = message;

  }

   showErrorModal(title:string, errorMessage: string) {
    const modalRef = this.modalService.open(ErrorModalComponent, { centered: true });
    modalRef.componentInstance.title = title ;
    modalRef.componentInstance.errorMessage = errorMessage;
  }

  // }
  // private openInfoModal(title: string, message: string) {
  //   const modalRef = this.modalService.open(InfoModalComponent, { centered: true });
  //   modalRef.componentInstance.title = title;
  //   modalRef.componentInstance.message = message;
  // }

  // private openErrorModal(title: string, message: string) {
  //   const modalRef = this.modalService.open(ErrorModalComponent, { centered: true });
  //   modalRef.componentInstance.title = title;
  //   modalRef.componentInstance.message = message;
  // }
  restaurants: RestauBenefitRestaurant[] = [
    {
      id: 1,
      merchant_number: 232,
      name: 'Kayser House',
      benefit_percentage: 20.0,
      benefit_availability_policy: 'allowed'
    },
  ];
  //  // Méthode pour ouvrir la modal d'ajout de restaurant
  //  openAddRestaurantModal() {
  //   this.modalService.open('addRestaurantModal', { centered: true });
  // }
   // Méthode pour ouvrir la modal d'ajout de restaurant
   openViewTauxRestaurantModal() {
    const modalRef = this.modalService.open(ViewTauxRestaurantComponent, { centered: true });
    modalRef.componentInstance.restaurantAdded.subscribe(() => {
      this.handleRestaurantAdded();
    });
  }
   openAddRestaurantModal() {
    const modalRef = this.modalService.open(AddRestaurantComponent, { centered: true });

    // Vous pouvez passer des données au composant de la modal si nécessaire
    // modalRef.componentInstance.someInputData = /* ... */;
    // Écouter l'événement restaurantAdded et appeler handleRestaurantAdded
     modalRef.componentInstance.restaurantAdded.subscribe(() => {
      this.handleRestaurantAdded();
    });
  }
  handleRestaurantAdded() {
    this.loadRestaurants(); // Actualiser la liste des restaurants après l'ajout
  }
  constructor(private benefitRestaurantService: BenefitRestaurantService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadRestaurants();
    // this.loadRestaurants();

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

  // Méthode pour ajouter un restaurant (à implémenter)
  addRestaurant() {
    // Logique d'ajout du restaurant ici

    // Fermez la modal après ajout
    this.modalService.dismissAll();
  }
}