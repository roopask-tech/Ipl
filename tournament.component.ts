import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Team } from '../model/tournament.model';
import { TeamAmount } from '../model/teamamount.model';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Player } from '../model/player.model';
import {Router} from '@angular/router'
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  teams: Team[] = [];
  teamsAmount: TeamAmount[] = [];
  public columnChart: GoogleChartInterface;
  public pieChart: GoogleChartInterface;
  constructor(private appSerive: AppService,
    private route:Router) { }

  ngOnInit(): void {
    this.appSerive.getTeamDetails().subscribe(res => {
      this.teams = res;
    });
    this.appSerive.getAmountSpentTeams().subscribe(res => {
      this.teamsAmount = res;
      this.teamsAmount = this.teamsAmount.sort((t1,t2)=>t1.amount-t2.amount)
      let chartData = [];
      chartData.push(["Team","Amount"])
      this.teamsAmount.forEach(t=>{
        chartData.push([t.teamName,t.amount]);
      })
      this.displayChart(chartData);
    });
    this.showRoleCountInfo();

  }
  showRoleCountInfo() {
    this.appSerive.getAllPlayers().subscribe(data=>{
        let players:Player[];
        players = data;
        let count_map = new Map();
        players.forEach(e=>{
          if(!count_map.get(e.role)){
            count_map.set(e.role, 1);
          }else{
            count_map.set(e.role,count_map.get(e.role) + 1);
          }
        })
        let chartData = [];
        chartData.push(["Role","Count"])
        for (let [key, value] of count_map.entries()) {
          chartData.push([key,value]);
        }
       this.displayPieChart(chartData);
        

    })
  }

  displayPieChart(data:any){
    this.pieChart = {
      chartType :"PieChart",
      dataTable: data,
      options: { title: 'Role count Inforamtion'}

    }
  }
  displayChart(data: any) {
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: data,
      options: { title: 'Team and Amount' }
    }
  }

  showTeamDetails(label:string){
      this.route.navigate(['/team',label]);
  }
  

}