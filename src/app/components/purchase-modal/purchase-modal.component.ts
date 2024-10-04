import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/productInterface';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent {

  @Input() productChild!: Product;
  @Input() isModalVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

}
