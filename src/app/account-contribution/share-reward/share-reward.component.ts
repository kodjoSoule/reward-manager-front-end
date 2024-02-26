import { AccountContributionEventsServiceService } from './../account-contribution-events-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { RewardItemComponent } from '../reward-item/reward-item.component';
import { CommonModule } from '@angular/common';
import { Reward } from '../../reward-manager/reward';
import { NgbActiveModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { RewardStorageService } from '../../reward-manager/reward-storage.service';
import { FormControl, FormsModule } from '@angular/forms';
import { RewardManagerService } from '../../reward-manager/reward-manager.service';
import { AccountContributionService } from '../account-contribution.service';
import { RewardManagerEventsServiceService } from '../../reward-manager/reward-manager-events-service.service';
import { RewardInfo } from '../RewardInfo';

@Component({
  selector: 'app-share-reward',
  standalone: true,
  imports: [
RewardItemComponent,CommonModule,NgbPagination,FormsModule

  ],
  templateUrl: './share-reward.component.html',
  styleUrl: './share-reward.component.css'
})
export class ShareRewardComponent implements OnInit{
@Input () account_number!: String;
  rewards: any[] = [];

  rewardInfo : RewardInfo = {
    Reward_confirmation_number : '',
    Credt_card_number : '',
      Account_number: ''
  };

  selectedReward: String | undefined;
//   credit_card_reponse
// {
//     "account_number": "AN001",
//     "credt_card_number": "CC00120231221"
// }
  credit_card: any = {
    account_number: 'AN001',
    credit_card_number: 'CC00120231221'
};

  constructor(
    private activeModal: NgbActiveModal,
    private rewardManagerService:RewardManagerService,
    private accountContributionService : AccountContributionService,
private accountContributionEventsServiceService : AccountContributionEventsServiceService

  ) {}

  ngOnInit(): void {
    this.loadCreditCardByAccountNumber(this.account_number);
    //this.loadRewardsByCreditCard(this.credit_card.credit_card_number);
  }
  loadCreditCardByAccountNumber(accountNumber: String): void {
    // Chargez la liste des récompenses depuis le service de stockage
    this.accountContributionService.getCreditCardByAccountNumber(accountNumber)
      .subscribe(
        response => {
          this.credit_card = response;
        },
        error => {
          // Gérez l'erreur en conséquence
        },

        () => {
          console.log('Credit card loaded successfully', this.credit_card);
          this.loadRewardsByCreditCard(this.credit_card.credit_card_number);
      }

      );

  }
  loadRewardsByCreditCard(creditCard: String): void {
    // Chargez la liste des récompenses depuis le service de stockage
    console.log('Debut de la requete de chargement des recompenses');
    console.log('Credit card:', creditCard);
    this.rewardManagerService.getRewardByCreditCardNumber(creditCard).subscribe(
      (rewards) => {
      this.rewards = rewards;
      console.log('Rewards loaded successfully', rewards);

    },
    error => {
      // Gérez l'erreur en conséquence
    }

    );
  }

  closeModal(): void {
    this.activeModal.close();
  }

  selectReward(): void {
    // Vérifiez si une récompense est sélectionnée
    this.rewardInfo.Credt_card_number = this.credit_card.credit_card_number;
    this.rewardInfo.Account_number = this.credit_card.account_number;
    this.rewardInfo.Reward_confirmation_number = this.selectedReward as string;
    console.log('Selected reward:', this.rewardInfo);

    if (this.selectedReward !== undefined) {
      this.accountContributionEventsServiceService.emitRewardShared(this.rewardInfo);
      // Fermez la modal et retournez la récompense sélectionnée
      this.activeModal.close(this.selectedReward);
    }
  }
}
