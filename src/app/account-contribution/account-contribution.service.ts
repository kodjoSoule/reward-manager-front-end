import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Account } from './account';
import { Beneficiary } from './beneficiary';
@Injectable({
  providedIn: 'root'
})

export class AccountContributionService {
  private apiUrl = 'http://localhost:8765/account-contribution';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:4200",
    })
  };

  constructor(private http: HttpClient) {}
  createAccount(account: Account): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts`, account, this.httpOptions);
  }

  getAccounts(): Observable<Account[]> {
    console.log(`fetching data`);
    console.log(`${this.apiUrl}`);
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
    // const requestBody = { newBeneficiary: allocationPercentage };

    return this.http.post<any>(url, newBeneficiary );
  }
  removeBeneficiary(accountNumber: string, beneficiaryId: number): Observable<any> {
    const url = `${this.apiUrl}/accounts/${accountNumber}/beneficiaries/${beneficiaryId}`;
    // const requestBody = { newBeneficiary: allocationPercentage };
    return this.http.delete<any>(url);
  }

  shareReward(creditCardNumber: string, reward_confirmation: string): Observable<any> {


    return this.http.put<any>(`${this.apiUrl}/${creditCardNumber}/reward/${reward_confirmation}`, {});
  }
  getCreditCardByAccountNumber(accountNumber: String): Observable<any> {
    // http://localhost:8765/account-contribution/credit-card/AN001
    return this.http.get<string>(`${this.apiUrl}/accounts/${accountNumber}/credit-card/`);
  }



  updateBeneficiaryAllocation(beneficiaryId: number, allocationPercentage: number): Observable<any> {
    const requestBody = { allocation_percentage: allocationPercentage };
    return this.http.put<any>(`${this.apiUrl}/beneficiaries/${beneficiaryId}`, requestBody);
  }
}
