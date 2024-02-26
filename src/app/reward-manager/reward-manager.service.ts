
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reward } from './reward';


@Injectable({
  providedIn: 'root'
})
export class RewardManagerService implements OnInit {
  private apiUrl = 'http://localhost:8765/reward-manager'; // Remplacez par l'URL de votre API

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
    console.log(newReward);
    return this.http.post(url, newReward);
  }


  getRewardByCreditCardNumber(creditCardNumber: String): Observable<Reward[]> {
    return this.http.get<any>(`${this.apiUrl}/rewards/credit-card/${creditCardNumber}`);
  }
}
