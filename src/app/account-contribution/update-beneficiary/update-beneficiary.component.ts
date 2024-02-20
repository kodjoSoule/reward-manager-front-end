
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountContributionService } from '../account-contribution.service';
import { AccountContributionEventsServiceService } from '../account-contribution-events-service.service';


@Component({
  selector: 'app-update-beneficiary',
  standalone: true,
  providers : [AccountContributionService, EventEmitter],
  imports: [CommonModule, FormsModule],
  templateUrl: './update-beneficiary.component.html',
  styleUrl: './update-beneficiary.component.css'
})
export class UpdateBeneficiaryComponent implements OnInit {
  @Input() accountId!: number; // Vous devez fournir l'ID du compte depuis le composant parent
  @Input() beneficiary_id!: number; // Vous devez fournir l'ID du bénéficiaire depuis le composant parent
  @Output() handlePercentageUpdated = new EventEmitter<string>();

  @Output() messageEvent = new EventEmitter<string>();
  updatedAllocationPercentage!: number;




  constructor(public activeModal: NgbActiveModal,
    private beneficiaryUpdateService: AccountContributionEventsServiceService,
    private accountContributionService : AccountContributionService) {}

  ngOnInit(): void {}

  updateBeneficiary(): void {
    // Logique de mise à jour du bénéficiaire
    // Utilisez this.updatedAllocationPercentage pour accéder au nouveau pourcentage

    this.accountContributionService.updateBeneficiaryAllocation(this.beneficiary_id, this.updatedAllocationPercentage).subscribe(
      (data) => {
        console.log('Beneficiary percentage updated ');
        this.handlePercentageUpdated.emit();
        this.messageEvent.emit('OKAY');
        // Émettre un événement ou transmettre une indication de succès à travers une modal
        // Émettre l'événement de mise à jour du bénéficiaire
      this.beneficiaryUpdateService.emitBeneficiaryUpdated();
      // Fermer la modal après la mise à jour
      this.activeModal.close('handlePercentageUpdated');
      },
      (error) => {
        //console.error('Error loading accounts:', error);
      }
    );
    // Fermez la modal après la mise à jour
    this.activeModal.close();
  }
  sendMessage() {
    console.log("clicker")
    this.messageEvent.emit('Message du composant enfant vers le composant parent !');
  }

  closeModal(): void {
    // Fermer la modal sans effectuer de mise à jour
    this.activeModal.dismiss('cancel');
  }
}
