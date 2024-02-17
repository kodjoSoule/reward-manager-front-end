
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reward } from './reward';


@Injectable({
  providedIn: 'root'
})
export class RewardManagerService implements OnInit {
  private apiUrl = 'http://localhost:8300/reward-manager'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}
  ngOnInit(): void {

  }

  getRewards(): Observable<Reward[]> {
    const url = `${this.apiUrl}/rewards`;
    return this.http.get<Reward[]>(url);
  }

  getRewardByConfirmantion_number(rewardId: number): Observable<Reward> {
    const url = `${this.apiUrl}/rewards/${rewardId}`;
    return this.http.get<Reward>(url);
  }

  createReward(newReward: any): Observable<any> {
    const url = `${this.apiUrl}/rewards`;
    return this.http.post(url, newReward);
  }

  // Ajoutez d'autres méthodes selon les besoins
}