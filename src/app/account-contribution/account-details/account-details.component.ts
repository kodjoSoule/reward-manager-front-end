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


@Component({
  selector: 'app-account-details',
  standalone: true,
  providers :[AccountContributionService],
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
    credit_card_number: '',
    benefits: 0.0
  }; // Utilisez le type correct pour Account
  //account: any = {};

  beneficiaries: Beneficiary[] = [];

  account_number: string = '';
  errorMessage : string = '';

  isLoading: boolean = false;


  constructor(private accountService: AccountContributionService
,
private eventsService : AccountContributionEventsServiceService,
private route: ActivatedRoute,
private modalService: NgbModal

    ) {}

  ngOnInit(): void {
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
    // Mettez à jour les détails du compte et les bénéficiaires si nécessaire
    this.loadAccountDetails();
    this.loadBeneficiaries();
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
  shareReward() {
      // Vous devez implémenter la logique pour partager la récompense ici
      // Par exemple, vous pouvez appeler la méthode shareReward du service
      // avec le numéro de carte de crédit et le montant de la récompense
      const rewardAmount = 500; // Remplacez par le montant réel de la récompense
      console.log(this.account.credit_card_number);
      this.accountService.shareReward(this.account.credit_card_number, rewardAmount).subscribe(
        (response) => {

          this.errorMessage ='Récompense partagée avec succès';
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
  beneficiaryAdded() {
    this.loadBeneficiaries();
  }
}
