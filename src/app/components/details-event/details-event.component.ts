import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ActivatedRoute, Params} from '@angular/router';
import { EventInterface } from '../../models/event-interface';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {

  constructor(private dataApi: DataApiService,private route: ActivatedRoute) { }
  private event: EventInterface = {
    id: "",
    name: "",
    slug: "",
    date: "",
    time: "",
    address: "",
    quotas: "",
    expositor: "",
    addressed: "",
    description: "",
    poster: "",
    banner: "",
    state: "",
    category: "",
    created_at: ""
  }

  ngOnInit() {
    const event_id = this.route.snapshot.params["slug"];
    this.getDetails(event_id);
  }

  getDetails(slug: string){
    this.dataApi.getEventById(slug).subscribe(event => (this.event = event));
  }

}
