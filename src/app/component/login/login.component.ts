import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,RouterLink,
    ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string ;
  password: string ;
  redirectUrl: string ;
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {
    this.username= '';
    this.password= '';
    this.redirectUrl= '';


  }
  ngOnInit(): void {

  }

  openErrorModal(): void {
    const dialogRef = this.dialog.open(ModalInfoComponent, {
      width: '250px',
      data: { message: 'Échec de la connexion. Veuillez vérifier vos identifiants.' }
    })
  }
  login(): void {
    if (this.authService.login(this.username, this.password)) {
      //actualiser le componenet header
      // Redirection vers une page sécurisée (par exemple, la page d'accueil)
      // /this.router.navigate(['/home']);
      this.redirectUrl = this.authService.redirectUrl;
      this.router.navigate([this.redirectUrl || '/home']);
      this.redirectUrl = ''; // Réinitialisez l'URL de redirection après utilisation

    } else {
      // Gestion d'un échec de connexion (par exemple, afficher un message d'erreur)
      console.log("erreru de connexion")
    }


  }
}