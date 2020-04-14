import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IplRoutingModule } from './ipl-routing.module';
import { IplComponent } from './ipl.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [IplComponent, TournamentComponent, TeamComponent, PlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IplRoutingModule,
    Ng2GoogleChartsModule,
    MatTableModule
  ]
  
})
export class IplModule { }
