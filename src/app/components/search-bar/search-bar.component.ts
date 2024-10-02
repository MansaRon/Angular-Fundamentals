import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() searchFilterOutput: EventEmitter<any> = new EventEmitter<any>();
  
  searchItem: string = '';

  constructor() {}

  ngOnInit(): void {}
  
  onSearch() {
    this.searchFilterOutput.emit(this.searchItem);   
  }

}
