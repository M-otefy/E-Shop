import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products';
import { CartComponent } from './cart/cart';
import { Users } from './users/users';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'users', component: Users },
];
