import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { DasboarComponent } from './components/admin/dasboar/dasboar.component';
import { NavComponent } from './shared/layout-admin/nav/nav.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HeaderComponent } from './shared/layout-website/header/header.component';
import { CategoryListComponent } from './components/admin/category-list/category-list.component';
import { HomePageComponent } from './components/page/home-page/home-page.component';
import { DetailPageComponent } from './components/page/detail-page/detail-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartPageComponent } from './components/Cart/cart-page/cart-page.component';
import { UserComponent } from './components/page/user/user.component';
import { AddressPageComponent } from './components/page/address-page/address-page.component';
import { CreateAddressComponent } from './components/page/address/create-address/create-address.component';
import { UpdateAddressComponent } from './components/page/address/update-address/update-address.component';
import { CategoryUpdateComponent } from './components/admin/category-update/category-update.component';
import { GetProductCategoryComponent } from './components/page/get-product-category/get-product-category.component';
import { OrderPageComponent } from './components/Cart/order-page/order-page.component';
import { CategoryCreateComponent } from './components/admin/category-create/category-create.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CreateProductComponent,
    UpdateProductComponent,
    CategoryListComponent,
    DasboarComponent,
    NavComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    HomePageComponent,
    DetailPageComponent,
    CartPageComponent,
    UserComponent,
    AddressPageComponent,
    CreateAddressComponent,
    UpdateAddressComponent,
    CategoryUpdateComponent,
    GetProductCategoryComponent,
    OrderPageComponent,
    CategoryCreateComponent,
    SearchPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    RouterLink ,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
