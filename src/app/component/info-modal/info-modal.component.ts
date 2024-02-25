// info-modal.component.ts

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titre}}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      {{ message }}
    </div>
  `,
})
export class InfoModalComponent {
  @Input() message!: string;
  @Input() titre! : string ;

  constructor(public activeModal: NgbActiveModal) {}
}
