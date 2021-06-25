import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string = 'http://localhost:8080/';

  constructor(private http :HttpClient, private dataService:DataService  ) { }

  getAllPlanets(){
    return this.http.get(this.baseUrl+'planets')
  }

  getFilters(filterType:string){
    return this.http.get<any[]>(this.baseUrl+filterType)
                                .pipe(
                                  map(filter => filter.map(filter => ({...filter, active:false})))    
                                )
  }

  searchPlanets(query:any){
    return this.http.get<any[]>(this.baseUrl+ 'planets?q=' + query)
  }

  getFilteredPlanets(){
    let colors:any = '';
    let shapes = '';
    let sizes = '';

    const colorsFilters = this.dataService.colors$.value;
    const shapesFilters = this.dataService.shapes$.value;
    const sizesFilters = this.dataService.sizes$.value;

    colorsFilters.map((filter:any) => {
      if(filter.active == true){
        colors += 'color='+filter.id+'&'
      }
    })

    shapesFilters.map((filter:any) => {
      if(filter.active == true){
        shapes += 'shape='+filter.id+'&'
      }
    })

    sizesFilters.map((filter:any) => {
      if(filter.active == true){
        sizes += 'size='+filter.id+'&'
      }
    })


    // console.log(this.baseUrl+'planets?'+ colors + shapes + sizes)
    return this.http.get(this.baseUrl+'planets?'+ colors + shapes + sizes  )
  }


}
