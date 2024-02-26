import { RewardStorageService, StoredReward } from './../../reward-manager/reward-storage.service';

import { Component, Input, OnInit, Pipe } from '@angular/core';
import { Beneficiary } from '../beneficiary';
import { AccountContributionService } from '../account-contribution.service';
import { BeneficiariesListComponent } from '../beneficiaries-list/beneficiaries-list.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Account } from '../account';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBeneficiaryComponent } from '../add-beneficiary/add-beneficiary.component';
import { FormsModule } from '@angular/forms';
import { AccountContributionEventsServiceService } from '../account-contribution-events-service.service';
import { BenefitCalculationService } from '../../benefit-calculation/benefit-calculation.service';
//import { RewardStorageService } from '../../reward-manager/reward-storage.service';
import { Reward } from '../../reward-manager/reward';
import { ShareRewardComponent } from '../share-reward/share-reward.component';




@Component({
  selector: 'app-account-details',
  standalone: true,
  providers :[AccountContributionService,
    RewardStorageService],
  imports: [BeneficiariesListComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit{

  @Input() account: Account ={
    id: 0,
    name: '',
    valid: '',
    account_number: '',
    credit_card_number: '1234-5678-9012-20099',
    benefits: 0.0
  }; // Utilisez le type correct pour Account
  //account: any = {};

  beneficiaries: Beneficiary[] = [];

  account_number: string = '';
  errorMessage : string = '';
  successMessage : string = '';

  isLoading: boolean = false;


  constructor(private accountService: AccountContributionService
,
private eventsService : AccountContributionEventsServiceService,
private route: ActivatedRoute,
private rewardStorageService : RewardStorageService,
private accountContributionService : AccountContributionService ,
private modalService: NgbModal

    ) {}

  ngOnInit(): void {
    //getcredit_card_number

   // Récupérer le numéro de compte à partir de l'URL
   this.route.params.subscribe(params => {
    this.account_number = params['account_number'];
    // Charger les détails du compte
  });
  this.loadAccountDetails();
  this.loadBeneficiaries();
  // Abonnez-vous à l'événement de mise à jour du bénéficiaire
  this.eventsService.beneficiariesUpdated$.subscribe(() => {
    console.log('Événement de mise à jour du bénéficiaire reçu.');
  // Mettez à jour les détails du compte et les bénéficiaires si nécessaire
  this.loadAccountDetails();
    this.loadBeneficiaries();
});
  // Abonnez-vous à l'événement de mise à jour du bénéficiaire
  this.eventsService.beneficiaryUpdated$.subscribe(() => {
    console.log('Événement de mise à jour du bénéficiaire reçu.');
    // Mettez à jour les détails du compte et les bénéficiaires si nécessaire
    this.loadAccountDetails();
    this.loadBeneficiaries();
  });
  // Abonnez-vous à l'événement de mise à jour du bénéficiaire
  this.eventsService.beneficiaryAdded$.subscribe(() => {
    console.log('Événement d\'ajout du bénéficiaire reçu.');
    this.loadAccountDetails();
    this.loadBeneficiaries();
  });
  // Abonnez-vous à l'événement de partage de récompense
  this.eventsService.rewardShared$.subscribe(
    (selectedReward: any) => {
    // Utilisez la valeur de la récompense sélectionnée
    // this.storedReward = selectedReward;
    console.log('Récompense sélectionnée:', selectedReward);
    //
//     Account_number: "ANØØI "
// Credt_card_number: "ccøø12ø231221"
// Reward_confirmation number :
//     //
    this.ShareRewardByRewardConfirmationNumberCreditCardNumber(selectedReward.Reward_confirmation_number , selectedReward.Credt_card_number);

    // Chargez les détails du compte et les bénéficiaires
    this.loadAccountDetails();
    this.loadBeneficiaries();
  },
  (error) => {
    console.error('Error loading rewards:', error);
  });
  }




  loadAccountDetails() {
    this.accountService.getAccountByNumber(this.account_number).subscribe(
      (data) => {
        this.account = data;
        console.log(data);

      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des détails du compte';


      }
    );
  }

  loadBeneficiaries() {
    this.accountService.getBeneficiaries(this.account_number).subscribe(
      (data) => {
        this.beneficiaries = data;
        console.log("Beneficiaries ");

      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des bénéficiaires';

      }
    );

  }
ShareRewardByRewardConfirmationNumberCreditCardNumber(rewardConfirmationNumber: string, creditCardNumber: string){
console.log("Recompense : "+rewardConfirmationNumber);
console.log("creditCardNumber : "+
  creditCardNumber);
  this.accountService.shareReward(creditCardNumber, rewardConfirmationNumber).subscribe(
    (response) => {
      this.successMessage ='Récompense partagée avec succès';
      // Actualisez les détails du compte et les bénéficiaires après le partage de la récompense
      this.loadAccountDetails();
      this.loadBeneficiaries();
    },
    (error) => {
      console.log(error);
      this.errorMessage ='Erreur lors du partage de la récompense \n'+error.error.message;

    }
  ).add(() => {
    this.isLoading = false;
  });

}

  openAddBeneficiaryModal() {
    const modalRef = this.modalService.open(AddBeneficiaryComponent, { centered: true });

    modalRef.componentInstance.account = this.account;
    modalRef.componentInstance.account_number = this.account_number;

    // modalRef.result.then((result) => {
    //   if (result === 'handlePercentageUpdated') {
    //     this.loadBeneficiaries();
    //   }
    //   if (result === 'messageEvent') {
    //     this.receiveMessage(result);
    //   }
    // }).catch((error) => {
    //   // Gérer les erreurs ou les fermetures de la modal
    // });





    modalRef.componentInstance.handlePercentageUpdated.subscribe(() => {
      this.loadAccountDetails();
      this.loadBeneficiaries();

    });
  }


  receiveMessage($event: string) {
    console.log($event); // Affiche le message émis par le composant enfant
  }

// Obtenez le credit_card_number de la dernière récompense créée

  shareReward() {
    this.rewardStorageService.getRewards

      // Vous devez implémenter la logique pour partager la récompense ici
      // Par exemple, vous pouvez appeler la méthode shareReward du service
      // avec le numéro de carte de crédit et le montant de la récompense
      //const rewardAmount = 1171; // Remplacez par le montant réel de la récompense
      const rewardNumber =prompt("Veuillez saisir le numéro de récompense à partager :");
// cast to number

      if (rewardNumber === null) {
        return;
      }

      console.log(this.account.credit_card_number);
      console.log("credit_card_number");
      this.accountService.shareReward("1234-5678-9012-20099", rewardNumber).subscribe(
        (response) => {

          this.successMessage ='Récompense partagée avec succès';
          // Actualisez les détails du compte et les bénéficiaires après le partage de la récompense
          this.loadAccountDetails();
          this.loadBeneficiaries();
        },
        (error) => {

          this.errorMessage ='Erreur lors du partage de la récompense'
        }
      ).add(() => {
        this.isLoading = false;
      });

  }

  openShareRewardModal(){
 // Ouvrir le modal ShareRewardComponent
 const modalRef = this.modalService.open(ShareRewardComponent, { centered: true });

 // Passez les données nécessaires au composant ShareRewardComponent
 modalRef.componentInstance.accountId = this.account.id;
  modalRef.componentInstance.account_number = this.account.account_number;

 modalRef.result.then(
   (selectedReward) => {
     // Traitez la récompense sélectionnée ici
     console.log('Récompense sélectionnée:', selectedReward);

     // Actualisez les détails du compte et les bénéficiaires après le partage de la récompense
     this.loadAccountDetails();
     // Vous pouvez également actualiser la liste des bénéficiaires ici si nécessaire
   },
   (dismissReason) => {
     // Le modal a été fermé sans sélectionner de récompense
     console.log('Modal fermé sans sélection de récompense:', dismissReason);
   }
 );
}
  beneficiaryAdded() {
    this.loadBeneficiaries();
  }
}
