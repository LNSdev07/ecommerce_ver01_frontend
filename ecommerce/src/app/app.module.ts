import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { HeaderShopComponent } from './shop/header-shop/header-shop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderDashboardComponent } from './dashboard/header-dashboard/header-dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./service_common/auth.interceptor";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment.prod";
import { SingerAvatarComponent } from './upload/singer-avatar/singer-avatar.component';
import { AdminComponent } from './admin/admin.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { QuanLyKhachHangComponent } from './admin/quan-ly-khach-hang/quan-ly-khach-hang.component';
import { QuanLySanPhamComponent } from './admin/quan-ly-san-pham/quan-ly-san-pham.component';
import { QuanLyThuChiComponent } from './admin/quan-ly-thu-chi/quan-ly-thu-chi.component';
import { TaiKhoanAdminComponent } from './admin/tai-khoan-admin/tai-khoan-admin.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import { QuanLyLoaiSanPhamComponent } from './admin/quan-ly-loai-san-pham/quan-ly-loai-san-pham.component';
import { ModalCategotyComponent } from './admin/quan-ly-loai-san-pham/modal-categoty/modal-categoty.component';
import { ModalDeleteComponent } from './admin/quan-ly-loai-san-pham/modal-delete/modal-delete.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatMenuModule} from "@angular/material/menu";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuanLySizeComponent } from './admin/quan-ly-size/quan-ly-size.component';
import { QuanLyColorComponent } from './admin/quan-ly-color/quan-ly-color.component';
import { QuanLyDiscountComponent } from './admin/quan-ly-discount/quan-ly-discount.component';
import { SizemodalComponent } from './admin/quan-ly-size/sizemodal/sizemodal.component';
import { SizemodalDeleteComponent } from './admin/quan-ly-size/sizemodal-delete/sizemodal-delete.component';
import { ColorModalComponent } from './admin/quan-ly-color/_modal/color-modal/color-modal.component';
import { DeleteColorModalComponent } from './admin/quan-ly-color/_modal/delete-color-modal/delete-color-modal.component';
import { DiscountModalComponent } from './admin/quan-ly-discount/_modal/discount-modal/discount-modal.component';
import { DeleteDiscountModalComponent } from './admin/quan-ly-discount/_modal/delete-discount-modal/delete-discount-modal.component';
import { AddProductModalComponent } from './admin/quan-ly-san-pham/_modals/add-product-modal/add-product-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    DashboardComponent,
    OrdersComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProfileDetailsComponent,
    AddressComponent,
    EditAddressComponent,
    HeaderShopComponent,
    HeaderDashboardComponent,
    SingerAvatarComponent,
    AdminComponent,
    QuanLyKhachHangComponent,
    QuanLySanPhamComponent,
    QuanLyThuChiComponent,
    TaiKhoanAdminComponent,
    QuanLyLoaiSanPhamComponent,
    ModalCategotyComponent,
    ModalDeleteComponent,
    QuanLySizeComponent,
    QuanLyColorComponent,
    QuanLyDiscountComponent,
    SizemodalComponent,
    SizemodalDeleteComponent,
    ColorModalComponent,
    DeleteColorModalComponent,
    DiscountModalComponent,
    DeleteDiscountModalComponent,
    AddProductModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MdbModalModule,
    MdbDropdownModule,
    MdbCheckboxModule,
    MatSliderModule,
    MatProgressBarModule,
    MatMenuModule,
    NgxPaginationModule,
    NgSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
