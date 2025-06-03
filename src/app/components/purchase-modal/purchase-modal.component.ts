import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/productInterface';
import { EcommerceserviceService } from 'src/app/service/ecommerceservice.service';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent {

  @Input() productChild!: Product;
  @Input() isModalVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  quantity: number = 1;

  constructor(private ecommerce: EcommerceserviceService) {}

  close(): void {
    this.closeModal.emit();
  }

  addToCart(): void {
    const productWithQuantity = {
      ...this.productChild,
      quantity: this.quantity
    };
    this.ecommerce.addToCart(productWithQuantity);
    this.close();
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}
