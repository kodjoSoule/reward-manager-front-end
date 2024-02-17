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

@Component({
  selector: 'app-account-details',
  standalone: true,
  providers :[AccountContributionService],
  imports: [BeneficiariesListComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit{
  @Input() account: any; // Utilisez le type correct pour Account
  //account: any = {};

  beneficiaries: Beneficiary[] = [];

  account_number: string = '';
  errorMessage : string = '';


  constructor(private accountService: AccountContributionService
,
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
  }
  // Méthode appelée lorsque le bénéficiaire est ajouté avec succès



  loadAccountDetails() {
    this.accountService.getAccountByNumber(this.account_number).subscribe(
      (data) => {
        this.account = data;
        console.log(data);

      },
      (error) => {
        console.log(error);

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
        console.log(error);

      }
    );

  }
  openAddBeneficiaryModal() {
    const modalRef = this.modalService.open(AddBeneficiaryComponent, { centered: true });
    // Vous pouvez passer des données au composant de la modal si nécessaire
    modalRef.componentInstance.account = this.account;
    modalRef.componentInstance.account_number = this.account_number;
  }

    shareReward() {
      // Vous devez implémenter la logique pour partager la récompense ici
      // Par exemple, vous pouvez appeler la méthode shareReward du service
      // avec le numéro de carte de crédit et le montant de la récompense
      const rewardAmount = 500; // Remplacez par le montant réel de la récompense
      this.accountService.shareReward(this.account.credit_card_number, rewardAmount).subscribe(
        (response) => {
          console.log('Récompense partagée avec succès', response);
          this.errorMessage ='Récompense partagée avec succès';
          // Actualisez les détails du compte et les bénéficiaires après le partage de la récompense
          this.loadAccountDetails();
          this.loadBeneficiaries();
        },
        (error) => {
          console.error('Erreur lors du partage de la récompense', error);
          this.errorMessage ='Erreur lors du partage de la récompense'
        }
      );

  }

  beneficiaryAdded() {
    // Actualisez les détails du compte après l'ajout du bénéficiaire
    //this.loadAccountDetails();
    this.loadBeneficiaries();
    this.ngOnInit();
  }
}