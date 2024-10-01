import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  
  searchForm = new FormGroup({    
    searchItem: new FormControl('')
  });

  constructor() {}

  ngOnInit(): void {}
  
  onSubmit() {    
    // TODO: Use EventEmitter with form value    
    console.warn(this.searchForm.value);  
  }

}
