import { Component , OnInit} from '@angular/core';
import { OderService } from 'src/app/services/oder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  order:any=[]
  product:any=[]
  products:any=[]
  constructor(private orderService: OderService,private router: Router ) {}

  ngOnInit(){
    this.getOrder()
  }

  getOrder() {
    this.orderService.GetOderCart().subscribe((order: any) => {
      console.log("Received order data:", order);
  
      if (order && order.data) {
        this.order = order.data;
  
        this.order.forEach((orderItem: any) => {
            this.products = orderItem
            console.log(this.products);
        });
  
        console.log("order", this.order);
      } else {
        console.error("Invalid order data structure");
      }
    });
  }
  
  cancelOrder(id:any){
    this.orderService.cancelOrderCart(id).subscribe((data:any)=>{
      console.log("hủy đơn thành công");
    })
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        setTimeout(() => {
         this.router.navigate([this.router.url]); 
        },3000)
        
      });
  }
  
  
  
}
