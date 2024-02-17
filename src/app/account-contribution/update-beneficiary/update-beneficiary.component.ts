import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-beneficiary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-beneficiary.component.html',
  styleUrl: './update-beneficiary.component.css'
})
export class UpdateBeneficiaryComponent implements OnInit {
  @Input() accountId!: number; // Vous devez fournir l'ID du compte depuis le composant parent
  @Input() beneficiaryId!: number; // Vous devez fournir l'ID du bénéficiaire depuis le composant parent

  updatedAllocationPercentage!: number;




  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  updateBeneficiary(): void {
    // Logique de mise à jour du bénéficiaire
    // Utilisez this.updatedAllocationPercentage pour accéder au nouveau pourcentage
    // Fermez la modal après la mise à jour
    this.activeModal.close();
  }
  closeModal(): void {
    // TODO
    // Méthode pour fermer la modal sans effectuer la mise à jour
    this.activeModal.close();
  }
}