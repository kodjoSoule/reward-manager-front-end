import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitCalculationService } from '../../benefit-calculation/benefit-calculation.service';
import { BenefitRestaurantService } from '../benefit-restaurant.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-taux-restaurant',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './view-taux-restaurant.component.html',
  styleUrl: './view-taux-restaurant.component.css'
})
export class ViewTauxRestaurantComponent {
  @Output() tauxRead: EventEmitter<void> = new EventEmitter<void>();

  merchant_number:number = 123;
  result: any; // Adjust the type based on the expected result

  constructor(
    private benefitRestaurantService: BenefitRestaurantService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.activeModal.close();
  }

  readTaux() {
    console.log(this.merchant_number)
    this.benefitRestaurantService.getRestaurantInfo(+this.merchant_number).subscribe(
      (response) => {
        this.result = response; // Adjust this based on your API response structure
        //this.tauxRead.emit(); // Emit the event after reading the taux
      },
      (error) => {
        console.error('Error reading taux:', error);
        // Handle error if necessary
      }
    );
  }
}