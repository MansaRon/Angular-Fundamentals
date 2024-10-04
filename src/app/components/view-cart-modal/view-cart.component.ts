import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/productInterface';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent {

  @Input() productsInCart?: Product[];
  @Input() isCartModalOpen?: boolean;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
