import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  localCart: any[] = [];
  productsMap = new Map<number, any>(); 

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('cart');
    this.localCart = stored ? JSON.parse(stored) : [];
    this.fetchProductDetails();
  }

  get totalPrice() {
    return this.localCart.reduce((sum, item) => {
      const prod = this.productsMap.get(item.productId);
      return sum + (prod?.price || 0) * item.quantity;
    }, 0);
  }

  removeItem(item: any) {
    this.localCart = this.localCart.filter(i => i.productId !== item.productId);
    localStorage.setItem('cart', JSON.stringify(this.localCart));
    alert('✅ Item removed');
  }

  fetchProductDetails() {
    const ids = this.localCart.map(i => i.productId);
    if (!ids.length) return;

    ids.forEach(id => {
      this.http.get<any>(`https://fakestoreapi.com/products/${id}`)
        .subscribe(prod => this.productsMap.set(id, prod));
    });
  }

  checkout() {
    const cartPayload = {
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      products: this.localCart
    };

    this.http.post('https://fakestoreapi.com/carts', cartPayload).subscribe({
      next: res => {
        alert('✅ Checkout successful!');
        localStorage.removeItem('cart');
        this.localCart = [];
      },
      error: err => {
        console.error(err);
        alert('❌ Checkout failed. Try again.');
      }
    });
  }
}
