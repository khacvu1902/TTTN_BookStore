import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  products: FormGroup;
  categories: any[] = [];
  productId: any;

  constructor(private categoryService: CategoryService,
    private productsService: ProductsService,
    private router: Router
    , private formBuilder: FormBuilder
    , private route: ActivatedRoute
    , private authService: AuthService) {
    this.products = this.formBuilder.group({
      name: [''],
      image: [''],
      price: [''],
      quantity: [''],
      categoryId: [''],
      sale: [''],
      desc: [''],
    }),

    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'));
      this.productId = id; // Store the product ID
      this.fetchProductData(id); // Fetch product data based on ID
    });
  };
;

ngOnInit() {
  this.getCategory()
}

getCategory() {
  this.categoryService.getAllCategory().subscribe((data: any) => {
    this.categories = data.category
    console.log(data);
  })
}

fetchProductData(id: string) {
  this.productsService.getIdProducts(id).subscribe(
    (data) => {
      this.products.patchValue(data.data);
    },
    (error) => {
      console.log('Error fetching product data:', error);
      // You can add error handling here
    }
  );
}

updateProduct() {
  const valueProduct = this.products.value
  const accessToken = this.authService.getAccessToken()
  this.productsService.updateProducts(valueProduct, this.productId , accessToken).subscribe(
    (data: any) => {
      console.log(data.data);
      this.router.navigate(['/admin/products']);
    }
  )
}
}
