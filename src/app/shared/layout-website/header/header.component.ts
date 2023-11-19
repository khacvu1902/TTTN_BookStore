import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})




export class HeaderComponent {
  public user: any
  cartProduct: any
  address: any = []
  products: any[] = []
  categories: any[] = []
  searchText: string = '';
  searchResults: {name: string, desc: string}[] = [];
  private searchTerms = new Subject<string>();
  filteredLocationList: any;
    constructor(
      private cartService: CartService,
      private authService: AuthService,
      private cdr: ChangeDetectorRef,
      private addressService: AddressService,
      private productsService: ProductsService,
      private categoryService: CategoryService) {
        this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(term => this.productsService.getAllProducts())
        ).subscribe(
          (data: any) => {
            this.searchResults = data.data;
          },
          (error) => {
            console.error('Lỗi khi tìm kiếm:', error);
          }
        );
  }

  onSearchChange() {
    if (!this.searchText.trim()) {
      // Nếu rỗng, xóa kết quả tìm kiếm
      this.searchResults = [];
      return;
    }
    this.searchTerms.next(this.searchText);
  }


  ngOnInit() {
    this.getUserData()
    console.log(this.user)
    this.getCartProduct();
    this.getAddress()
    this.getProducts()
    this.getCategory()
  }

  


  getProducts() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data.data
      console.log("hi",this.products);
      console.log(this.searchText);
    })
  }




  ngDoCheck() {
    this.getUserData();
  }

  getCategory() {
    this.categoryService.getAllCategory().subscribe((data: any) => {
      this.categories = data.category
      console.log(this.categories);
    })
  }




  getUserData() {
    this.user = this.authService.getUserLocal() ? JSON.parse(this.authService.getUserLocal()) : null
    // Gọi đoạn code cần thực hiện khi dữ liệu user thay đổi
    // Ví dụ: this.fetchUserData();
    // Sau khi hoàn thành tác vụ, gọi hàm markForCheck() để báo cho Angular biết rằng có thay đổi dữ liệu và cần render lại component.
    this.cdr.markForCheck();
  }



  getAddress() {
    this.addressService.getAddress().subscribe((data: any) => {
      this.address = data.data
      console.log(this.address);
      console.log(this.address);
    })
  }


  getCartProduct() {
    const user = JSON.parse(this.authService.getUserLocal())
    const userId = user._id
    this.cartService.getCartProductByUserId(userId).subscribe((cart) => {
      this.cartProduct = cart.data.items
      console.log(this.cartProduct);
    })
  }
}
