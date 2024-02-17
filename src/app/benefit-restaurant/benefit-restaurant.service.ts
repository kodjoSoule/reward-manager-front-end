// src/app/benefit-restaurant/benefit-restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BenefitRestaurantService {
  private apiUrl = 'http://localhost:8205'; // Remplacez par l'URL réelle de votre API

  constructor(private http: HttpClient) {}

  getRestaurantInfo(merchantNumber: number): Observable<any> {
    const url = `${this.apiUrl}/benefit-restaurant/merchants/${merchantNumber}`;
    return this.http.get(url);
  }

  getAllRestaurants(): Observable<any> {
    const url = `${this.apiUrl}/benefit-restaurant/merchants`;
    return this.http.get(url);
  }

  addRestaurant(restaurantData: any): Observable<any> {
    const url = `${this.apiUrl}/benefit-restaurant/merchants`;
    return this.http.post(url, restaurantData);
  }

  updateAvailability(merchantNumber: number, availability: string): Observable<any> {
    //http://localhost:8765/benefit-restaurant/merchants/232/not_allowed
    const url = `${this.apiUrl}/benefit-restaurant/merchants/${merchantNumber}/${availability}`;
    return this.http.put(url, {});
  }

  // Ajoutez d'autres méthodes d'appel API en fonction des besoins de votre application
}
