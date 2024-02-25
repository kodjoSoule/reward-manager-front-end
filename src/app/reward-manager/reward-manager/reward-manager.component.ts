import { Component, OnInit } from '@angular/core';
import { Reward } from '../reward';
import { RewardManagerService } from '../reward-manager.service';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterModule } from '@angular/router';
import { RewardItemComponent } from '../reward-item/reward-item.component';
import { CreateRewardComponent } from '../create-reward/create-reward.component';
import { RewardManagerEventsServiceService } from '../reward-manager-events-service.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-reward-manager',
  standalone: true,
  providers : [RewardManagerService],
  imports: [CommonModule,FormsModule,
NgxUiLoaderModule,
    RouterModule, RouterLink,
  RewardItemComponent,CreateRewardComponent
  ],
  templateUrl: './reward-manager.component.html',
  styleUrl: './reward-manager.component.css'
})
export class RewardManagerComponent implements OnInit{
  rewards: Reward[] =[];
  reward_confirmation_number :any ;
    newReward: { merchant_number: string, reward_amount: number, reward_confirmation_number :number }
    = {
       merchant_number: '', reward_amount: 0 ,
       reward_confirmation_number: 0
      };


  constructor(
    private  ngxLoader :NgxUiLoaderService,
    private rewardManagerEventsService :RewardManagerEventsServiceService,
    private rewardService: RewardManagerService, private modalService : NgbModal) {}



  ngOnInit() {
    this.ngxLoader.start();
    this.loadRewards();


//
// Souscrire à l'événement de création de récompense
this.rewardManagerEventsService.rewardCreated$.subscribe(() => {
  // Effectuer des actions spécifiques lors de la création de récompense
  console.log('Nouvelle récompense créée. Mettez à jour l\'interface utilisateur, etc.');
    this.loadRewards();
});

  }

  loadRewards() {
    // Utilisez le service pour charger les récompenses depuis l'API
    this.rewardService.getRewards().subscribe(
      (data: Reward[]) => {
        this.rewards = data
        this.ngxLoader.stop();
      },
      (error) => {
        console.error('Erreur lors du chargement des récompenses:', error);
        this.ngxLoader.stop();
      }
    );
  }

  createReward() {

    // Utilisez le service pour créer une nouvelle récompense
    this.rewardService.createReward(this.newReward).subscribe(
      (response) => {
        console.log('Récompense créée avec succès:', response);
        // Rechargez la liste des récompenses après la création
        this.loadRewards();
        // Réinitialisez le formulaire
        this.ngxLoader.stop();



      },
      (error) => {
        console.error('Erreur lors de la création de la récompense:', error);
        this.ngxLoader.stop();
      }
    );
  }


  // Méthode pour ouvrir la modal d'ajout de restaurant
  // openCreateRewardModal() {
  //   const modalRef = this.modalService.open(CreateRewardComponent, { centered: true });

  //   // Vous pouvez passer des données au composant de la modal si nécessaire
  //   // modalRef.componentInstance.someInputData = /* ... */;
  //   // Écouter l'événement restaurantAdded et appeler handleRestaurantAdded
  //   //  modalRef.componentInstance.restaurantAdded.subscribe(() => {
  //   //   this.handleRewardCreated();
  //   // });
  // }
  openCreateRewardModal() {
    const modalRef = this.modalService.open(CreateRewardComponent, { centered: true });
  }
  // handleRewardCreated() {
  //   console.info("Creeeeerrrrrrrrrrrr")
  //   // this.loadRestaurants(); // Actualiser la liste des restaurants après l'ajout
  // }
}