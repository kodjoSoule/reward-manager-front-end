import { Component, Input } from '@angular/core';
import { Reward } from '../reward';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reward-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './reward-item.component.html',
  styleUrl: './reward-item.component.css'
})
export class RewardItemComponent {
  @Input() reward!: Reward;
}
