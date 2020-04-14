import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
// import { ChartReadyEvent } from 'ng2-google-charts';
interface ITeamPlayer{
  name: string;
    role: string;
    label: string;
    price:string;
}
// interface ChartReadyEvent {
//   messagez: string;
// }

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public teamsLabeles =['select team','RR','RCB','KXIP','DC','MI','CSK','SRH','KKR'];
  public  selectedLabel='select team';
  public teamPlayers:any[]=[];
  public pieChart: GoogleChartInterface;
  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  
public submitteamlabel(){
  // <google-chart [data]='pieChart' (chartReady)='ready($event)'></google-chart>
  const url=`https://ipl2020-stat.herokuapp.com/ipl2020/team/${this.selectedLabel}`;
  this.http.get(url).subscribe((res:any)=>{
   this.teamPlayers=res;
////pi chart code/////
   const count_map =new Map();
   this.teamPlayers.forEach(e=>{
    if(!count_map.get(e.role)){
      count_map.set(e.role, 1);
    }else{
      count_map.set(e.role,count_map.get(e.role) + 1);
    }
  });
  let chartData = [];
  chartData.push(["Role","Count"])
  for (let [key, value] of count_map.entries()) {
    chartData.push([key,value]);
  }
 this.displayPieChart(chartData);
});
}
private displayPieChart(data){
  this.pieChart = {
    chartType: 'PieChart',
    dataTable: data,
    options: { title: 'Role and Price chart ' }
  }
}


/////pi chart end////
}
