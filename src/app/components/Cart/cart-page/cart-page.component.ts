import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OderService } from 'src/app/services/oder.service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartProduct: any[] = [];
  productId: any = []
  isPurchasing: boolean = false;
  totalItems: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService,
    private authService: AuthService,
    private oderService: OderService,
    private addressService:AddressService) { }

  ngOnInit() {
    this.getCartProduct();

  }


  getCartProduct() {
    const user = JSON.parse(this.authService.getUserLocal());
    const userId = user._id;
    this.cartService.getCartProductByUserId(userId).subscribe((cart) => {
      this.cartProduct = cart.data.items.map((item: any) => ({ ...item, isChecked: false }));
      console.log(this.cartProduct);
    });
  }

  onCheckboxChange(product: any) {
    console.log(`Checkbox for ${product} is checked: ${product.isChecked}`);
    console.log(product.product.name);
    // Perform any additional logic here
    if (product.isChecked) {
      this.totalItems += 1;
      this.totalItems = Math.max(0, this.totalItems);
    }

    if (product.isChecked) {
      this.totalPrice += (product.price * (1 - product.product.sale / 100));
      this.totalPrice = Math.max(0, this.totalPrice);
      console.log(this.totalPrice);
    }

    if (product.isChecked == false) {
      this.totalPrice -= (product.price * (1 - product.product.sale / 100));
      this.totalPrice = Math.max(0, this.totalPrice);
      console.log(this.totalPrice);
    }
    if (product.isChecked == false) {
      this.totalItems -= 1;
      this.totalItems = Math.max(0, this.totalItems);
      console.log(this.totalPrice);
    }
  }

  decreaesQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--
      this.updatePriceProduct(product)
    }
  }
  imcreaesQuantity(product: any) {
    product.quantity++
    this.updatePriceProduct(product)
  }

  updatePriceProduct(product: any) {
    product.price = product.quantity * product.product.price
  }

  deleteProduct(product: any) {
    const user = JSON.parse(this.authService.getUserLocal());
    const userId = user._id;
    this.cartService.RemoveCartProductByUserId(userId, product._id).subscribe(() => {
      this.cartProduct = this.cartProduct.filter((item: any) => item._id !== product._id)
    })
  }

  createOrder(){
    const addressId = JSON.parse(this.addressService.getIdAddress());
    const address = addressId._id;
    console.log("2tr",addressId);
    const total = this.totalPrice
    const products = this.selectedItems
    this.oderService.createOderCart({address , total , products }).subscribe((data:any)=>{

    })
  }

  items: string[] = [];
  selectedItems: string[] = [];

  toggleSelection(item: string): void {
    if (this.selectedItems.includes(item)) {
      // Nếu item đã tồn tại trong mảng, loại bỏ nó
      this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    } else {
      // Nếu item chưa tồn tại trong mảng, thêm nó vào
      this.selectedItems.push(item);
    }

    console.log(this.selectedItems);
  }
}
