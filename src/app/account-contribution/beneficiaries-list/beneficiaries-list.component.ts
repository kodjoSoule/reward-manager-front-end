import { Component, Input, OnInit, Pipe } from '@angular/core';
import { Beneficiary } from '../beneficiary';
import { CommonModule } from '@angular/common';
import { UpdateBeneficiaryComponent } from '../update-beneficiary/update-beneficiary.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beneficiaries-list',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './beneficiaries-list.component.html',
  styleUrl: './beneficiaries-list.component.css'
})
export class BeneficiariesListComponent implements OnInit{
  @Input() beneficiaries: Beneficiary[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  updatePercentage(beneficiary: Beneficiary): void {
    const modalRef = this.modalService.open(UpdateBeneficiaryComponent, { centered: true });
    modalRef.componentInstance.beneficiary = beneficiary;
  }
}