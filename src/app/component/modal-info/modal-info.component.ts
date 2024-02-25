import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.css'
})
export class ModalInfoComponent {
  constructor(public dialogRef: MatDialogRef<ModalInfoComponent>) {}
}
