import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchFilterOutput: EventEmitter<string> = new EventEmitter<string>();

  searchItem: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.searchFilterOutput.emit(this.searchItem);
  }
}
