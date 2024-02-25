import { Injectable } from '@angular/core';
import { UserRole } from './roles.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  redirectUrl: string = ''; // Nouvelle propriété pour stocker l'URL de redirection

  // Vérifier si l'utilisateur est connecté
  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }
   // Connecter l'utilisateur
   login(username: string, password: string): boolean {
    // Ajoutez ici votre logique d'authentification
    // Ceci est un exemple très basique
    if (username === 'admin' && password === '') {
      this.isLoggedIn = true;
      return true
    }
    return false
  }

  // Déconnecter l'utilisateur
  logout(): void {
    this.isLoggedIn = false;
  }
}