import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RewardManagerService } from '../reward-manager.service';
import { Reward } from '../reward';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-reward-info',
  standalone: true,
  imports:[
    CommonModule, RouterModule
  ],
  providers : [RewardManagerService],
  templateUrl: './reward-info.component.html',
  styleUrl: './reward-info.component.css'
})
export class RewardInfoComponent implements OnInit {
  rewardId!: number;
  rewardDetails!: Reward;
  constructor(private route: ActivatedRoute,
    private rewardService: RewardManagerService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rewardId = +params['id'];
      this.loadRewardDetails();
    });
  }
  loadRewardDetails() {
    this.rewardService.getRewardByConfirmantion_number(this.rewardId).subscribe(
      (response) => {
        this.rewardDetails = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails de la récompense', error);
      }
    );
  }
}
