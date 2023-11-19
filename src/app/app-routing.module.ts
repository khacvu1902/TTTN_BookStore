import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { NavComponent } from './shared/layout-admin/nav/nav.component';
import { DasboarComponent } from './components/admin/dasboar/dasboar.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HeaderComponent } from './shared/layout-website/header/header.component';
import { CategoryListComponent } from './components/admin/category-list/category-list.component';
import { HomePageComponent } from './components/page/home-page/home-page.component';
import { DetailPageComponent } from './components/page/detail-page/detail-page.component';
import { CartPageComponent } from './components/Cart/cart-page/cart-page.component';
import { UserComponent } from './components/page/user/user.component';
import { AddressPageComponent } from './components/page/address-page/address-page.component';
import { CreateAddressComponent } from './components/page/address/create-address/create-address.component';
import { UpdateAddressComponent } from './components/page/address/update-address/update-address.component';
import { GetProductCategoryComponent } from './components/page/get-product-category/get-product-category.component';
import { OrderPageComponent } from './components/Cart/order-page/order-page.component';
import { CategoryCreateComponent } from './components/admin/category-create/category-create.component';
import { CategoryUpdateComponent } from './components/admin/category-update/category-update.component';

const routes: Routes = [
  {path: '', component: HeaderComponent,children:[
    {path: 'signin', component: SigninComponent},
    {path: 'signup', component: SignupComponent},
    {path: '', component: HomePageComponent},
    {path: 'user/:id', component: UserComponent},
    {path: 'detail_product/:id', component: DetailPageComponent},
    {path: 'user/:UserId/cart', component: CartPageComponent},
    {path: 'address', component: AddressPageComponent},
    {path: 'address/add', component: CreateAddressComponent},
    {path: 'address/update/:id', component: UpdateAddressComponent},
    {path: 'category/:id', component: GetProductCategoryComponent},
    {path: 'order/getAll', component: OrderPageComponent},
  ]},
  {path :'admin', component:NavComponent,children:[
    {path: '', component:DasboarComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'addProducts', component: CreateProductComponent},
    {path: 'updateProducts/:id', component: UpdateProductComponent},
    {path: 'category', component: CategoryListComponent},
    {path: 'category/add', component: CategoryCreateComponent},
    {path: 'category/update/:id', component: CategoryUpdateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
