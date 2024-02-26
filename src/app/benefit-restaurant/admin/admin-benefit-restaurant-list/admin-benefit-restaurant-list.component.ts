
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
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-benefit-restaurant-list',
  standalone: true,
  providers : [BenefitRestaurantService,NgxUiLoaderService,
    NgxUiLoaderModule],
  imports: [
    CommonModule,RouterModule, FormsModule,
    NgxUiLoaderModule,NgxUiLoaderModule,
  ],
  templateUrl: './admin-benefit-restaurant-list.component.html',
  styleUrl: './admin-benefit-restaurant-list.component.css'
})
export class AdminBenefitRestaurantListComponent implements OnInit{
  restaurants: RestauBenefitRestaurant[] = [];
   // Méthode pour ouvrir la modal d'ajout de restaurant
   openAddRestaurantModal() {
    const modalRef = this.modalService.open(AddRestaurantComponent, { centered: true });

    // Vous pouvez passer des données au composant de la modal si nécessaire
    // modalRef.componentInstance.someInputData = /* ... */;
    // Écouter l'événement restaurantAdded et appeler handleRestaurantAdded
     modalRef.componentInstance.restaurantAdded.subscribe(() => {
      this.handleRestaurantAdded();
    });
  }
  openViewTauxRestaurantModal() {
    const modalRef = this.modalService.open(ViewTauxRestaurantComponent, { centered: true });
    modalRef.componentInstance.restaurantAdded.subscribe(() => {
      this.handleRestaurantAdded();
    });
  }

  handleRestaurantAdded() {
    this.loadRestaurants(); // Actualiser la liste des restaurants après l'ajout
  }
  constructor(private benefitRestaurantService: BenefitRestaurantService,private modalService: NgbModal,
    private ngxLoader : NgxUiLoaderService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.loadRestaurants();
    // this.loadRestaurants();

  }


  loadRestaurants() {
    this.benefitRestaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.log(error);
      }
      ,
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
          // Refresh the list after updating availability
          this.loadRestaurants();
        },
        (error) => {
          console.log(error);
        },
        ()=>{
          this.ngxLoader.stop();
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
