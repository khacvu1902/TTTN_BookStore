import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-product-category',
  templateUrl: './get-product-category.component.html',
  styleUrls: ['./get-product-category.component.css']
})
export class GetProductCategoryComponent {
  similarProducts: any[] = [];
  categoryId:any

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'));
      this.categoryId = id; // Store the product ID
      this.getProductByCategory(id); // Fetch product data based on ID
    });
  }

  getProductByCategory(id:any){
    this.categoryService.getOneCategory(id).subscribe((category:any) => {
      this.similarProducts = category.category
      console.log(this.similarProducts);
    })
  }



}
