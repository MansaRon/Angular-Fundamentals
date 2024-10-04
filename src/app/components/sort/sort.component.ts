import { Component, EventEmitter, Output } from '@angular/core';
import { EcommerceserviceService } from 'src/app/service/ecommerceservice.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {

  constructor(private ecommerce: EcommerceserviceService) {}

  dropdownOpen = false;
  selectedSort: string = 'price-asc';
  @Output() sortSelected = new EventEmitter<string>();

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSortSelected(sortString: string) {
    this.selectedSort = sortString;
    this.sortSelected.emit(sortString);
    this.toggleDropdown();
  }

}
