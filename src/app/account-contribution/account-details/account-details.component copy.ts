// import { Component, Input } from '@angular/core';
// import { Beneficiary } from '../beneficiary';
// import { AccountContributionService } from '../account-contribution.service';
// import { BeneficiariesListComponent } from '../beneficiaries-list/beneficiaries-list.component';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-account-details',
//   standalone: true,
//   providers :[AccountContributionService],
//   imports: [BeneficiariesListComponent, CommonModule],
//   templateUrl: './account-details.component.html',
//   styleUrl: './account-details.component.css'
// })
// export class AccountDetailsComponent {
//   @Input() account: any; // Utilisez le type correct pour Account
//   beneficiaries: Beneficiary[] = [];

//   constructor(private accountService: AccountContributionService) {}

//   ngOnInit(): void {
//     // Chargez la liste des bénéficiaires lors de l'initialisation
//     this.loadBeneficiaries();
//   }

//   loadBeneficiaries() {
//     if (this.account && this.account.account_number) {
//       this.accountService.getBeneficiaries(this.account.account_number)
//         .subscribe(beneficiaries => this.beneficiaries = beneficiaries);
//     }
//   }

//   shareReward() {
//     // Mettez en œuvre la logique pour partager la récompense ici
//     // Vous devrez peut-être afficher un formulaire ou une boîte de dialogue pour saisir le montant de la récompense, etc.
//   }
// }