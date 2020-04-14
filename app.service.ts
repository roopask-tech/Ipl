import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './model/tournament.model';
import { TeamAmount } from './model/teamamount.model';
import { Player } from './model/player.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  base_url = "https://ipl2020-stat.herokuapp.com/ipl2020/team/";
  constructor(private http:HttpClient) { }

  getTeamDetails():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.base_url}all`);
  }
  getAmountSpentTeams():Observable<TeamAmount[]>{
    return this.http.get<TeamAmount[]>(`${this.base_url}totalamount`);
  }
  getAllPlayers():Observable<Player[]>{
    return this.http.get<Player[]>(`${this.base_url}players/all`);
  }

  getMaxPaidPlayers():Observable<Player[]>{
    return this.http.get<Player[]>(`${this.base_url}maxamoutbyrole`);
  }

}