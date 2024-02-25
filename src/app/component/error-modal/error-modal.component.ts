// error-modal.component.ts

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      {{ errorMessage }}
    </div>
  `,
})
export class ErrorModalComponent {
  @Input() errorMessage!: string;
  @Input() title!: string;

  constructor(public activeModal: NgbActiveModal) {}
}
