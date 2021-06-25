import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { DataService } from '../../data.service';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  planets$:any = new Observable();

  constructor(private http: HttpService, private dataService:DataService) { }
  
  ngOnInit(): void {
      this.planets$ = this.dataService.planets$;
  }

}
