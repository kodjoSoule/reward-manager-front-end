
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RewardManagerService } from '../reward-manager.service';
import { BenefitRestaurantService } from '../../benefit-restaurant/benefit-restaurant.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Reward } from '../reward';
import { RewardConfirmation } from '../reward-confirmation';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModalComponent } from './response-modal.component';
import { RewardRequest } from '../reward-request';
import { RewardManagerEventsServiceService } from '../reward-manager-events-service.service';
import { RewardStorageService } from '../reward-storage.service';
@Component({
  selector: 'app-create-reward',
  standalone: true,
  providers : [RewardManagerService,
    RewardStorageService],
  imports: [
    CommonModule, FormsModule,FontAwesomeModule,
    RouterModule, RouterLink
  ],

  templateUrl: './create-reward.component.html',
  styleUrl: './create-reward.component.css'
})
export class CreateRewardComponent {
  // Ajoutez une variable pour gérer le chargement
  loading: boolean = false;
  errorMeesage : string= '';
  newReward: RewardRequest = {
    // s
    id: 171,
    credit_card_number: '',
    merchant_number: 112,
    dining_amount: 2300,
    dining_date: '2022-12-21T13:56:00Z',
  };

  restaurants: any[] = []; // Assurez-vous que le type correspond à la structure de vos données de restaurant
  constructor(
    private rewardManagerService: RewardManagerService,
    private rewardManagerEventsService : RewardManagerEventsServiceService,
    private benefitRestaurantService: BenefitRestaurantService,
    private router : Router,
    private rewardStorageService: RewardStorageService,
    private activeModal :NgbActiveModal,
    private modalService : NgbModal

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
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  closeModal(): void {
    this.activeModal.close();
  }
  createReward() {
    // Activez le chargement
    this.loading = true;
    console.log(this.newReward);
    this.rewardManagerService.createReward(this.newReward).subscribe(
      (response: RewardConfirmation) => {
        console.log('Récompense créée avec succès:', response);
        this.errorMeesage = 'Récompense créée avec succès';
        // Désactivez le chargement après la création réussie
        this.loading = false;
        // Émettre l'événement de création de récompense
        this.rewardManagerEventsService.emitRewardCreated();


         // Ajoutez la récompense à la liste des récompenses stockées
        this.rewardStorageService.addReward({
          reward_confirmation_number: response.reward_confirmation_number,
          credit_card_number: this.newReward.credit_card_number,
        });

        // Affichez le message de réponse sur le même modal
        this.showResponseModal(this.errorMeesage);
        // Fermer la modal après la création réussie
        this.activeModal.close();
        // Rechargez la liste des récompenses après la création
        // Vous pouvez également émettre un événement pour informer le composant parent de la création réussie.
      },
      (error) => {
        this.errorMeesage = 'Erreur lors de la création de la récompense:' ;
        console.error(this.errorMeesage+ ' : '+ error)
        this.showResponseModal(this.errorMeesage);
        // Désactivez le chargement en cas d'erreur
        this.loading = false;
        // Gérez les erreurs lors de la création de la récompense
      }
    );
  }
  // Méthode pour afficher un modal avec le message de réponse
  showResponseModal(response: string) {
    const modalRef = this.modalService.open(ResponseModalComponent, { centered: true });
    // Passez le message de réponse au composant modal
    modalRef.componentInstance.responseMessage = response;

    // Attendez la fermeture du modal
    modalRef.result.then(
      (result) => {
        console.log('Modal fermé avec résultat:', result);
      },
      (reason) => {
        console.log('Modal fermé avec raison:', reason);
      }
    );
  }
}