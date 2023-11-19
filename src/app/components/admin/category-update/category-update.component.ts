import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent {
  category:FormGroup
  idCategory:any
  constructor( private route:ActivatedRoute,private categoryService : CategoryService , private router:Router ,private formBuilder: FormBuilder){
    this.category = this.formBuilder.group({
      name :['' , Validators.required],
    }),

    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'));
      this.idCategory = id; // Store the product ID
      this.fetchProductData(id); // Fetch product data based on ID
    });
  }

  fetchProductData(id: string) {
    this.categoryService.getOneCategory(id).subscribe(
      (data) => {
        console.log(data);
        this.category.patchValue(data.message);
      },
      (error) => {
        console.log('Error fetching product data:', error);
        // You can add error handling here
      }
    );
  }

  updateCategory(){
    const categories = this.category.value
    this.categoryService.updateCategory(this.idCategory,categories).subscribe((data:any) =>{
      console.log(data);
      this.router.navigate(['/admin/category'])
    })
  }
}
