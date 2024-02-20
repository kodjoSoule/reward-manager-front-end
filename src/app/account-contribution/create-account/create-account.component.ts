import { AccountAddeedServiceService } from './../account-addeed-service.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountContributionService } from '../account-contribution.service';
import { Account } from '../account';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { AccountContributionEventsServiceService } from '../account-contribution-events-service.service';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  @Output() accountCreatedSuccessfully = new EventEmitter<any>();
  accountCreated = false;
  isSuccess = false ;
  isLoading =true ;

  newAccount : any = {

    name: 'Soule',
    credit_card_number : '1234567',
    account_number : '123455',

  };

  constructor(private accountService: AccountContributionService,

    private accountAddedService: AccountAddeedServiceService,
    private eventService : AccountContributionEventsServiceService,
    public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  createAccount(): void {
    this.accountService.createAccount(this.newAccount).subscribe(
      (response) => {
        // Gérer la réponse réussie, par exemple, afficher un message de succès
        console.log('Compte créé avec succès:', response);
         // Émettre l'événement de mise à jour du bénéficiaire
      this.eventService.emitAccountCreated();
        // Gérer la réponse réussie, par exemple, définir le statut et le message de succès
        this.isSuccess = true ;
        this.accountCreated = true;
      },
      (error) => {
        // Gérer l'erreur, par exemple, afficher un message d'erreur
        console.error('Erreur lors de la création du compte:', error);
        this.isSuccess = false;
        this.accountCreated = true;
      },
      // ()=>{
      //   this.isSuccess = true ;
      //   this.accountCreated = true;
      // }
    );
  }

  // Méthode pour fermer le formulaire modal
closeModal(): void {
  this.activeModal.close();
}
}
