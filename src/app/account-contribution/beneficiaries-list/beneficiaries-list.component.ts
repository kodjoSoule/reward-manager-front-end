import { AccountContributionServiceAxios } from './../account-contribution-axios.service';
import { AccountContributionEventsServiceService } from './../account-contribution-events-service.service';
import { AccountAddeedServiceService } from './../account-addeed-service.service';
import { Account } from './../account';
import { Component, Input, OnInit, Pipe, input } from '@angular/core';
import { Beneficiary } from '../beneficiary';
import { CommonModule } from '@angular/common';
import { UpdateBeneficiaryComponent } from '../update-beneficiary/update-beneficiary.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountContributionService } from '../account-contribution.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-beneficiaries-list',
  standalone: true,
  providers : [],
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './beneficiaries-list.component.html',
  styleUrl: './beneficiaries-list.component.css'
})
export class BeneficiariesListComponent implements OnInit{
  @Input() beneficiaries: Beneficiary[] = [];
  @Input() account!: Account ;

  constructor(private modalService: NgbModal,
private eventsService : AccountContributionEventsServiceService,
  private router : Router,
  private accountContributionServiceAxios : AccountContributionServiceAxios,

     private accountContributionService : AccountContributionService) {}

  ngOnInit(): void {




  }
  refreshBeneficiaries(): void {
    // Actualisez la liste des bénéficiaires ici (peut-être en rechargeant les données depuis le service)
    this.accountContributionService.getBeneficiaries(this.account.account_number).subscribe(
      response => {
        this.beneficiaries = response;
      },
      error => {
        // Gérez l'erreur en conséquence
      }
    );
this.eventsService.emitBeneficiariesUpdated();

  }

  removeBeneficiary(beneficiary: Beneficiary): void {
    this.accountContributionServiceAxios.removeBeneficiary(this.account.account_number, beneficiary.id)
      .then(
        response => {
          console.log('Beneficiary deleted successfully', response);
          // Actualisez la liste des bénéficiaires après la suppression
          this.refreshBeneficiaries();
        }
      )
      .catch(
        error => {
          console.error('Error deleting beneficiary', error);
          // Gérez l'erreur ou fournissez un retour à l'utilisateur en conséquence.
        }
      );
  }
  removeBeneficiary2(beneficiary: Beneficiary): void {
    this.accountContributionService.removeBeneficiary(this.account.account_number, beneficiary.id)
    .subscribe(
      response => {
        console.log('Beneficiary deleted successfully', response);
// Actualisez la liste des bénéficiaires après la suppression
      this.refreshBeneficiaries();
      },
      error => {
        console.error('Error deleting beneficiary', error);
        // Gérez l'erreur ou fournissez un retour à l'utilisateur en conséquence.
      }
    );
  }

  updatePercentage(beneficiary: Beneficiary): void {
    const modalRef = this.modalService.open(UpdateBeneficiaryComponent, { centered: true });

    modalRef.componentInstance.beneficiary_id = beneficiary.id;

  }
}
