import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountContributionEventsServiceService {
  private accountCreatedSource = new Subject<void>();
  private beneficiaryAddedSource = new Subject<void>();
  private beneficiaryUpdatedSource = new Subject<void>();
  private beneficiariesUpdatedSource = new Subject<void>();
  private rewardSharedSource = new Subject<void>();

  accountCreated$ = this.accountCreatedSource.asObservable();
  beneficiaryAdded$ = this.beneficiaryAddedSource.asObservable();
  beneficiaryUpdated$ = this.beneficiaryUpdatedSource.asObservable();
  beneficiariesUpdated$ = this.beneficiariesUpdatedSource.asObservable();
  rewardShared$ = this.rewardSharedSource.asObservable();


  emitAccountCreated(): void {
    this.accountCreatedSource.next();
  }

  emitBeneficiaryAdded(): void {
    this.beneficiaryAddedSource.next();
  }
  emitBeneficiaryUpdated(): void {
    this.beneficiaryUpdatedSource.next();
  }
  emitBeneficiariesUpdated(): void {
    this.beneficiariesUpdatedSource.next();
  }

  emitRewardShared(): void {
    this.rewardSharedSource.next();
  }
}