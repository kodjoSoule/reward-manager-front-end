import { Component, OnInit } from '@angular/core';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { AccountContributionService } from '../account-contribution.service';
import { Account } from '../account';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AccountContributionItemComponent } from '../account-contribution-item/account-contribution-item.component';

import { AccountContributionEventsServiceService } from '../account-contribution-events-service.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-account-contribution-list',
  providers: [
    NgxUiLoaderService,
    NgxUiLoaderModule
  ],
  standalone: true,
  imports: [
    NgxUiLoaderModule,
    AccountDetailsComponent, CommonModule,AccountContributionItemComponent,
    NgxPaginationModule
  ],
  templateUrl: './account-contribution-list.component.html',
  styleUrl: './account-contribution-list.component.css'
})
export class AccountContributionListComponent implements OnInit{
  accounts: Account[] = [];
  loading :boolean = false ;
  p: number = 1;

  constructor(private accountService: AccountContributionService,
    private eventsService :AccountContributionEventsServiceService,
    private ngxLoader : NgxUiLoaderService,
    private modalService: NgbModal) {}
   // Méthode pour ouvrir la modal d'ajout de compte
   openAddAccountModal() {
    // Utilisez votre service de modal pour ouvrir la modal
    this.modalService.open(CreateAccountComponent, { centered: true });
  }
  ngOnInit(): void {
    this.ngxLoader.start();
    this.loadAccounts();
    // Abonnez-vous à l'événement de mise à jour du bénéficiaire
    this.eventsService.accountCreated$.subscribe(() => {
      console.log('Événement de mise à jour du compte reçu.');
    // Mettez à jour les détails du compte et les bénéficiaires si nécessaire
    this.loadAccounts();
  });

  }

   // Méthode appelée lorsqu'un compte est créé avec succès
   accountCreatedSuccessfully(): void {
    // Actualiser la liste des comptes
    this.loadAccounts();
  }

  private loadAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (data) => {
        this.accounts = data;

      },
      (error) => {
        console.error('Error loading accounts:', error);
      },
      ()=>{
        this.ngxLoader.stop();
      }
    );

  }
}
