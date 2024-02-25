// response-modal.component.ts
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-response-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Réponse de la création de récompense</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>{{ responseMessage }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Fermer</button>
    </div>
  `,
})
export class ResponseModalComponent {
  @Input() responseMessage: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}
