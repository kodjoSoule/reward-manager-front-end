import { Routes } from '@angular/router';
import { BenefitRestaurantListComponent } from './benefit-restaurant/benefit-restaurant-list/benefit-restaurant-list.component';
import { AddRestaurantComponent } from './benefit-restaurant/add-restaurant/add-restaurant.component';
import { UpdateRestaurantAvailabilityComponent } from './benefit-restaurant/update-restaurant-availability/update-restaurant-availability.component';

import { RewardInfoComponent } from './reward-manager/reward-info/reward-info.component';
import { CreateRewardComponent } from './reward-manager/create-reward/create-reward.component';
import { CreateAccountComponent } from './account-contribution/create-account/create-account.component';
import { AddBeneficiaryComponent } from './account-contribution/add-beneficiary/add-beneficiary.component';
import { AccountDetailsComponent } from './account-contribution/account-details/account-details.component';
import { BeneficiariesListComponent } from './account-contribution/beneficiaries-list/beneficiaries-list.component';
import { UpdateBeneficiaryComponent } from './account-contribution/update-beneficiary/update-beneficiary.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AboutComponent } from './component/about/about.component';
import { RewardManagerComponent } from './reward-manager/reward-manager/reward-manager.component';
import { AccountContributionComponent } from './account-contribution/account-contribution/account-contribution.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './component/login/login.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdminBenefitRestaurantListComponent } from './benefit-restaurant/admin/admin-benefit-restaurant-list/admin-benefit-restaurant-list.component';
export const routes: Routes = [
{ path: 'home', component: HomeComponent },

{ path: 'about', title: 'A propos', component: AboutComponent},
{ path: 'login', component: LoginComponent },
 // Ajoutez cette ligne pour le LoginComponent

  { path: 'benefit-restaurant-list',title: 'Listes des produits',  component: BenefitRestaurantListComponent },
  { path: 'add-restaurant', component: AddRestaurantComponent },
  { path: 'update-restaurant-availability', component: UpdateRestaurantAvailabilityComponent },
  { path: 'reward-manager',title: 'Gestion des recompenses', component: RewardManagerComponent },
  { path: 'reward-info/:reward_confirmation_number', component: RewardInfoComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'create-reward', component: CreateRewardComponent },
  { path: 'account-contribution',title: 'Account Contribution', component: AccountContributionComponent },//, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'add-beneficiary', component: AddBeneficiaryComponent },
  { path: 'account-contribution/accounts/:account_number', component: AccountDetailsComponent },
  { path: 'beneficiaries-list', component: BeneficiariesListComponent },
  { path: 'update-beneficiary', component: UpdateBeneficiaryComponent },
  { path: 'benefit-restaurant/admin/list', component: AdminBenefitRestaurantListComponent },
  { path: '', redirectTo: '/benefit-restaurant-list', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
