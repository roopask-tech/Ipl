import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Player } from '../model/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  players: Player[] = [];
  wicketKeepers: Player[] = [];
  batsman: Player[] =[];
  allRounder : Player[] =[];
  bowler : Player[] =[];
  
  constructor(private appService: AppService) { }
  
  ngOnInit(): void {
    this.appService.getAllPlayers().subscribe(data => {
      this.players = data;
      this.players.sort((p1, p2) => p2.price - p1.price);
    });
    this.appService.getMaxPaidPlayers().subscribe(data => {
      let maxPaidPlayers = [];
      maxPaidPlayers = data;
      // console.log("maxPaidPlayers",maxPaidPlayers);
      maxPaidPlayers.forEach(ele => {
        if (ele.role === "Wicket Keeper") {
          this.wicketKeepers=(ele.players);
        } else if (ele.role === "Batsman") {
          this.batsman=(ele.players);
        } else if (ele.role === "All-Rounder") {
          this.allRounder=(ele.players);
        } else if (ele.role === "Bowler") {
          this.bowler=(ele.players);
        }
      })
      //console.log(this.batsman);
     // console.log(this.wicketKeepers, this.batsman, this.allRounder, this.bowler);
    })
  }
}
