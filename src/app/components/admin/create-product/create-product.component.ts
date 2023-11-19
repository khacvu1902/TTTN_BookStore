import { CategoryService } from '../../../services/category.service';
import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  products: FormGroup;
  categories: any[] = [];

  constructor( private categoryService:CategoryService,private productsService: ProductsService , private router:Router , private formBuilder: FormBuilder) {
    this.products = this.formBuilder.group({
      name :['' , Validators.required],
      image :['',Validators.required],
      price :['',Validators.required],
      quantity :['',Validators.required],
      categoryId :['',Validators.required],
      sale: ['',Validators.required],
      desc :['',Validators.required],
    })
  }
  ngOnInit(){
    this.getCategory()
    this.postProduct()
  }

  getCategory(){
    this.categoryService.getAllCategory().subscribe((data:any)=>{
        this.categories = data.category
        console.log(data);
    })
  }  

  postProduct(){
    const valueProudct = this.products.value
    this.productsService.postProducts(valueProudct).subscribe(
      (data:any)=>{
        console.log(data);
        this.router.navigate(['/admin/products']);
      }
    )
  }
}
