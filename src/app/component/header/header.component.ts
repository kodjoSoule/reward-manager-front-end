import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [
    RouterOutlet, RouterModule, CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {
  const islog = this.authService.isLoggedInUser ;
  }
  constructor(private authService : AuthService, private router : Router){

  }
  isAuthenticated(): boolean {
    // Utilisez la méthode isLoggedIn de votre service d'authentification
    return this.authService.isLoggedInUser();
  }

  logout(): void {
    // Appelez la méthode logout de votre service d'authentification
    this.authService.logout();

    // Utilisez un tableau pour spécifier l'URL vers lequel naviguer
    this.router.navigate(['/home']);
  }

}
