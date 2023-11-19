import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OderService } from 'src/app/services/oder.service';

@Component({
  selector: 'app-dasboar',
  templateUrl: './dasboar.component.html',
  styleUrls: ['./dasboar.component.css']
})
export class DasboarComponent {
  products: any[] = []
  totalPrice: number = 0
  oder: any[] = []
  numberOfOrders: number = 0;
  totalOder:any[]=[];
  constructor(private productsService: ProductsService, private orderService: OderService) { }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
      this.calculateTotalPrice();
    });
    this.orderService.GetOderCart().subscribe((data: any) => {
      this.oder = data.data;
      console.log(this.oder);
    
      this.numberOfOrders = this.oder.length;
    
      this.totalOder = this.oder.reduce((total, order) => {
        console.log(total);
        return total + parseInt(order.total, 10);
      }, 0); // Thêm giá trị khởi tạo cho reduce
    });
    
  }


  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((accumulator, product) => {
      const productPrice = product.price;
      return accumulator + productPrice;
    }, 0)
  }
}
