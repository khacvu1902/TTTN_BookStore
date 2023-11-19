import { Component , OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products : any;

  constructor(private productsService : ProductsService){

  }

  ngOnInit(){
    this.getAllProducts()
  }

  getAllProducts(){
    this.productsService.getAllProducts().subscribe((data:any)=>{
        this.products = data.data
        console.log(this.products);
    })}
}
