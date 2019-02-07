import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { EventInterface } from '../../models/event-interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  private events: EventInterface;

  ngOnInit() {
    this.getListEvents();
  }

  getListEvents(){
    this.dataApi.getAllEvent()
    .subscribe((events: EventInterface) => (this.events = events.data));
  }



}
