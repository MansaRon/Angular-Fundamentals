import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/data/productInterface';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent {

  @Input() products!: Product;
  @Input() isModalVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

}
