import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  shapes$:any = new BehaviorSubject([])
  sizes$:any = new BehaviorSubject([])
  colors$:any = new BehaviorSubject([])

  planets$:any =  new BehaviorSubject([])

  updateLocalStorage(){
    localStorage.setItem('colorsFilters', JSON.stringify(this.colors$.value) )
    localStorage.setItem('sizesFilters', JSON.stringify(this.sizes$.value) )
    localStorage.setItem('shapesFilters', JSON.stringify(this.shapes$.value) )
  }

}
