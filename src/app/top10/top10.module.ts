import { Top10RoutingModule } from './top10.routing.module';
import { Top10Service } from './services/top10.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Top10Component } from './top10.component';
import { ListPositionComponent } from './list-position/list-position.component';

@NgModule({
	declarations: [Top10Component, ListPositionComponent],
	imports: [CommonModule, Top10RoutingModule],
	providers: [Top10Service],
})
export class Top10Module {}
