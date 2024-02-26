import { Component, Input, OnInit, input } from '@angular/core';
import { Reward } from '../../reward-manager/reward';

@Component({
  selector: 'app-reward-item',
  standalone: true,
  imports: [],
  templateUrl: './reward-item.component.html',
  styleUrl: './reward-item.component.css'
})
export class RewardItemComponent implements OnInit{
@Input() reward!: Reward;
  constructor() {}
  ngOnInit(): void {}

}
