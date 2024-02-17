import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountContributionService } from '../account-contribution.service';
import { Account } from '../account';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  newAccount : any = {

    name: '',
    credit_card_number : '',
    account_number : '',

  };

  constructor(private accountService: AccountContributionService,
    public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  createAccount(): void {
console.log(this.newAccount.name)
console.log(this.newAccount.account_number)
console.log(this.newAccount.credit_card_number)
    this.accountService.createAccount(this.newAccount).subscribe(
      (response) => {
        // Gérer la réponse réussie, par exemple, afficher un message de succès
        console.log('Compte créé avec succès:', response);
      },
      (error) => {
        // Gérer l'erreur, par exemple, afficher un message d'erreur
        console.error('Erreur lors de la création du compte:', error);
      }
    );
  }

  // Méthode pour fermer le formulaire modal
closeModal(): void {
  this.activeModal.close();
}
}
