import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  @Output() filterEvent = new EventEmitter<any>();
  @Input() filters:any;
  @Input() filterName:any;



  constructor() { 
  }

  ngOnInit(): void {
  }


  getValueOnClick(event:Event, filterStauts:boolean, filterId:any){
    event.preventDefault();
    this.filters.forEach((element:any) => {
      if(element.id == filterId ){
        element.active = !filterStauts
      }
    });


    const filterDetails ={
      filterStauts : filterStauts,
      // filterType : filterType,
      filterId : filterId
    }

    this.filterEvent.emit(filterDetails)
  }

}
