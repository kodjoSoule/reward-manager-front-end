import { Component, Input, inject } from '@angular/core';
import { AccountContributionService } from '../account-contribution.service';
import { Beneficiary } from '../beneficiary';
import { BeneficiariesListComponent } from '../beneficiaries-list/beneficiaries-list.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'app-account-contribution-item',
  standalone: true,
  imports: [
BeneficiariesListComponent, CommonModule
  ],
  templateUrl: './account-contribution-item.component.html',
  styleUrl: './account-contribution-item.component.css'
})
export class AccountContributionItemComponent {
  @Input() account!: Account; // Utilisez le type correct pour Account
  beneficiaries: Beneficiary[] = [];

  constructor(private accountService: AccountContributionService) {}

  ngOnInit(): void {
    // Chargez la liste des bénéficiaires lors de l'initialisation
    this.loadBeneficiaries();
  }

  loadBeneficiaries() {
    if (this.account && this.account.account_number) {
      this.accountService.getBeneficiaries(this.account.account_number)
        .subscribe(beneficiaries => this.beneficiaries = beneficiaries);
    }
  }
  router = inject(Router);
  DetailsAccount() {
    const account_number = this.account.account_number;
    this.router.navigate(['account-contribution/accounts', account_number]);
  }


}