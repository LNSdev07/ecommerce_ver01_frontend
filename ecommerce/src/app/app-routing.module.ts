import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'shop', component: ShopComponent},
  {path:'product-single', component: ProductsingleComponent},
  {path:'sign-up', component: SignupComponent},
  {path: 'address', component: AddressComponent},
  {path: 'check-out', component: CheckoutComponent},
  {path:'dashboard', component: DashboardComponent},
  {path: 'edit-address', component: EditAddressComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'profile-detail', component: ProfileDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path:'**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
