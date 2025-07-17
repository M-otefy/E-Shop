import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent {
  products$: Observable<any[]>;
  cart: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.products$ = this.http.get<any[]>('https://fakestoreapi.com/products');
  }

  addToCart(product: any) {
    const existing = this.cart.find((p) => p.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ productId: product.id, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));

    alert(`✅ "${product.title}" added to cart.`);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
