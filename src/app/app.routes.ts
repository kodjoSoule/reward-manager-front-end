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
export const routes: Routes = [
{ path: 'home', component: HomeComponent },
  { path: 'benefit-restaurant-list',title: 'Listes des produits',  component: BenefitRestaurantListComponent },
  { path: 'add-restaurant', component: AddRestaurantComponent },
  { path: 'update-restaurant-availability', component: UpdateRestaurantAvailabilityComponent },
  { path: 'reward-info', component: RewardInfoComponent },
  { path: 'create-reward', component: CreateRewardComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'add-beneficiary', component: AddBeneficiaryComponent },
  { path: 'account-details', component: AccountDetailsComponent },
  { path: 'beneficiaries-list', component: BeneficiariesListComponent },
  { path: 'update-beneficiary', component: UpdateBeneficiaryComponent },
  { path: '', redirectTo: '/benefit-restaurant-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/benefit-restaurant-list', pathMatch: 'full' }
];
