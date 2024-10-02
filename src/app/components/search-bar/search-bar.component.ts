import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() searchFilterOutput: EventEmitter<any> = new EventEmitter<any>();
  
  searchForm = new FormGroup({    
    searchItem: new FormControl('')
  });

  constructor() {}

  ngOnInit(): void {}
  
  onSubmit() {    
    // TODO: Use EventEmitter with form value
    this.searchFilterOutput.emit(this.searchForm.value.searchItem);    
    console.log(this.searchForm.value);  
  }

}
