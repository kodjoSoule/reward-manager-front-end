import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Account } from './account';
import { Beneficiary } from './beneficiary';
@Injectable({
  providedIn: 'root'
})
export class AccountContributionServiceAxios {
  private apiUrl = 'http://localhost:8765/account-contribution';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      },
    });
  }

  createAccount(account: Account): Promise<any> {
    return this.axiosInstance.post('/accounts', account);
  }

  getAccounts(): Promise<Account[]> {
    return this.axiosInstance.get('/accounts');
  }

  getAccountByNumber(accountNumber: string): Promise<Account> {
    return this.axiosInstance.get(`/accounts/${accountNumber}`);
  }

  getBeneficiaries(accountNumber: string): Promise<Beneficiary[]> {
    return this.axiosInstance.get(`/accounts/${accountNumber}/beneficiaries`);
  }

  getBeneficiary(accountNumber: string, beneficiaryId: number): Promise<Beneficiary> {
    return this.axiosInstance.get(`/accounts/${accountNumber}/beneficiaries/${beneficiaryId}`);
  }

  addBeneficiary(accountNumber: string, newBeneficiary: Beneficiary): Promise<any> {
    return this.axiosInstance.post(`/accounts/${accountNumber}/beneficiaries`, newBeneficiary);
  }

  removeBeneficiary(accountNumber: string, beneficiaryId: number): Promise<any> {
    return this.axiosInstance.delete(`/accounts/${accountNumber}/beneficiaries/${beneficiaryId}`);
  }

  shareReward(creditCardNumber: string, reward: number): Promise<any> {
    return this.axiosInstance.put(`/${creditCardNumber}/reward/${reward}`, {});
  }

  updateBeneficiaryAllocation(beneficiaryId: number, allocationPercentage: number): Promise<any> {
    const requestBody = { allocation_percentage: allocationPercentage };
    return this.axiosInstance.put(`/beneficiaries/${beneficiaryId}`, requestBody);
  }
}
