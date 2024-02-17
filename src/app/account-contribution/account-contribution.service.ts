import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Account } from './account';
import { Beneficiary } from './beneficiary';
@Injectable({
  providedIn: 'root'
})
export class AccountContributionService {
  private apiUrl = 'http://localhost:8400/account-contribution';

  constructor(private http: HttpClient) {}
  createAccount(account: Account): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts`, account);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`);
  }

  getAccountByNumber(accountNumber: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/accounts/${accountNumber}`);
  }

  getBeneficiaries(accountNumber: string): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${this.apiUrl}/accounts/${accountNumber}/beneficiaries`);
  }

  getBeneficiary(accountNumber: string, beneficiaryId: number): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.apiUrl}/accounts/${accountNumber}/beneficiaries/${beneficiaryId}`);
  }
  addBeneficiary(accountNumber: string, newBeneficiary: Beneficiary): Observable<any> {
    const url = `${this.apiUrl}/accounts/${accountNumber}/beneficiaries`;
    return this.http.post<any>(url, newBeneficiary);
  }

  shareReward(creditCardNumber: string, reward: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${creditCardNumber}/reward/${reward}`, {});
  }


  updateBeneficiaryAllocation(beneficiaryId: number, allocationPercentage: number): Observable<any> {
    const requestBody = { allocation_percentage: allocationPercentage };
    return this.http.put<any>(`${this.apiUrl}/beneficiaries/${beneficiaryId}`, requestBody);
  }
}