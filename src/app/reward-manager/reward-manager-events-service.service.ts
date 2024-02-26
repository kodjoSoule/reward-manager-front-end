import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardManagerEventsServiceService {

  constructor() { }


  private rewardCreatedSource = new Subject<void>();
  private rewardSelectedSource = new Subject<void>();



  // Observable pour écouter l'événement de création de récompense
  rewardCreated$: Observable<void> = this.rewardCreatedSource.asObservable();

  rewardSelected$: Observable<void> = this.rewardSelectedSource.asObservable();

  // Méthode pour émettre l'événement de création de récompense
  emitRewardCreated(): void {
    this.rewardCreatedSource.next();
  }
  //
  emitRewardSelected(): void {
    this.rewardSelectedSource.next();
  }
}
