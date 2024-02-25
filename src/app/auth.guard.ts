// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Assurez-vous d'avoir un service d'authentification


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  redirectUrl : string = '';

  constructor(private authService: AuthService, private router: Router) {


  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.redirectUrl = state.url || '/';
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isLoggedInUser()) {
      return true;
    }
    // Stockez l'URL de redirection dans le service d'authentification pour y accéder après la connexion
     this.authService.redirectUrl = this.redirectUrl;


    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion (ou une autre page appropriée)
    this.router.navigate(['/login']);
    return false;
  }
}
