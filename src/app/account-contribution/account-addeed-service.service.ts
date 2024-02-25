import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountAddeedServiceService {
  private accountAddedSource = new Subject<void>();

  accountAdded$ = this.accountAddedSource.asObservable();

  emitAccountAdded(): void {
    this.accountAddedSource.next();
  }
}
