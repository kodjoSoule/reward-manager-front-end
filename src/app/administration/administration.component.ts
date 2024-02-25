import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminBenefitRestaurantListComponent } from '../benefit-restaurant/admin/admin-benefit-restaurant-list/admin-benefit-restaurant-list.component';

@Component({
  selector: 'app-administration',
  standalone: true,
  providers : [RouterModule],

  imports: [CommonModule, RouterModule, RouterLink,
    AdminBenefitRestaurantListComponent
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {
  constructor(private router: Router) {}
  manageRestaurant(): void {
    // Logique pour rediriger vers la page d'ajout de restaurant
    this.router.navigate(['benefit-restaurant/admin/list']);
  }

  manageAccounts(): void {
    // Logique pour rediriger vers la page de gestion des comptes
    this.router.navigate(['/administration/manage-accounts']);
  }

  // Ajoutez d'autres méthodes pour les fonctionnalités supplémentaires
}