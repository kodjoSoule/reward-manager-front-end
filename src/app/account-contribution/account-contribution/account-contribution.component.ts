import { Component, OnInit } from '@angular/core';
import { AccountContributionListComponent } from '../account-contribution-list/account-contribution-list.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountContributionFormComponent } from '../account-contribution-form/account-contribution-form.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-contribution',
  standalone: true,
  providers : [
    NgbModal,
    RouterModule,


  ],
  imports: [
    AccountContributionListComponent,
    AccountContributionFormComponent,
    CreateAccountComponent,
    RouterOutlet, RouterModule, CommonModule
  ],
  templateUrl: './account-contribution.component.html',
  styleUrl: './account-contribution.component.css'
})
export class AccountContributionComponent implements OnInit{
  ngOnInit(): void {}
  constructor (private router : Router){}
}
