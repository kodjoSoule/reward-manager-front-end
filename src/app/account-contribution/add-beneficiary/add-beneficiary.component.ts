import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Beneficiary } from '../beneficiary';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountContributionService } from '../account-contribution.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-beneficiary',
  standalone: true,
  providers:[
    AccountContributionService

  ],
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-beneficiary.component.html',
  styleUrl: './add-beneficiary.component.css'
})
export class AddBeneficiaryComponent implements OnInit{
  @Input() account_number!: string; // Vous devez fournir le numéro de compte depuis le composant parent

  @Output() beneficiaryAdded: EventEmitter<void> = new EventEmitter<void>();


  newBeneficiary: Beneficiary = {
    id: 0,
    name: '',
    percentage: 0,
    savings: 0
  };

  constructor(private activeModal: NgbActiveModal,private  beneficiaryService : AccountContributionService,
    private _snackBar: MatSnackBar
    ) {}


  ngOnInit(): void {
  }

  addBeneficiary() {
      //Ajouter le bénéficiaire (remplacez cette logique par votre appel API ou votre service)
      this.beneficiaryService.addBeneficiary (this.account_number, this.newBeneficiary).subscribe(
        (response) => {

          console.log('Bénéficiaire ajouté avec succès', response);
          this.beneficiaryAdded.emit(); // Émettre l'événement après l'ajout
          this.activeModal.close();

        },
        (error) => {

          console.error('Erreur lors de l\'ajout du bénéficiaire', error);
          this.activeModal.close();

        }
      );

  }
  closeModal(): void {
    this.activeModal.close();
  }
}