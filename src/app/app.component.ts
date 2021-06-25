import { Component, OnInit } from '@angular/core';

import { HttpService } from './http.service';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'planet-search-angular';

  constructor(private http: HttpService, private dataService: DataService) { }

  shapes$: any = new Observable();
  sizes$: any = new Observable();
  colors$: any = new Observable();

  searchKeywords:any;

  ngOnInit() {
    
    this.getShapesFilters()
    this.getSizesFilters()
    this.getColorsFilters()

   


  
    
    // this.http.getFilteredPlanets().subscribe(data =>  this.dataService.planets$.next(data))
    
  }


  getShapesFilters(){
    if(localStorage.getItem('shapesFilters')){

      const shapes:any = localStorage.getItem('shapesFilters')
      console.log(JSON.parse(shapes))
      this.dataService.shapes$.next(JSON.parse(shapes));
      this.shapes$ = this.dataService.shapes$;
      this.http.getFilteredPlanets().subscribe(data =>  this.dataService.planets$.next(data))
    }else{
      // console.log('FAIL to shape filters')
      this.http.getFilters('shapes').subscribe(data => {
        this.dataService.shapes$.next(data);
        this.shapes$ = this.dataService.shapes$;
      })
    }
  }

  getSizesFilters(){
    if(localStorage.getItem('sizesFilters') ){
      const sizes:any = localStorage.getItem('sizesFilters')
      this.dataService.sizes$.next(JSON.parse(sizes));
      this.sizes$ =  this.dataService.sizes$;
      this.http.getFilteredPlanets().subscribe(data =>  this.dataService.planets$.next(data))
    }else{

      this.http.getFilters('sizes').subscribe(data => {
        this.dataService.sizes$.next(data);
        this.sizes$ = this.dataService.sizes$;
      })
    }
  }


  getColorsFilters(){
    if(localStorage.getItem('colorsFilters')){
      const colors:any = localStorage.getItem('colorsFilters')
      this.dataService.colors$.next(JSON.parse(colors));
      this.colors$ = this.dataService.colors$;
      this.http.getFilteredPlanets().subscribe(data =>  this.dataService.planets$.next(data))
    }else{
      
      this.http.getFilters('colors').subscribe(data => {
        this.dataService.colors$.next(data);
        this.colors$ = this.dataService.colors$;
      })
    }
    
  }



  updateFilter(filterDetails:any){
    this.http.getFilteredPlanets().subscribe( data => {
        // console.log(data)
        this.dataService.planets$.next(data)
        this.dataService.updateLocalStorage();
      }
    )
  
  }

  searchByEnter(event:any){
    this.searchKeywords = event.target.value;
    if(event.keyCode == 13){
      // console.log(event.target.value)
      this.http.searchPlanets(event.target.value).subscribe(data => {
          this.dataService.planets$.next(data)
      })
    }
  }
  serachByBtn(){
    this.http.searchPlanets(this.searchKeywords).subscribe(data => {
      this.dataService.planets$.next(data)
  })
  }



}
