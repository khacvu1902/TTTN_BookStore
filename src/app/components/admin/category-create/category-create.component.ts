import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  category:FormGroup
  constructor(private categoryService : CategoryService , private router:Router ,private formBuilder: FormBuilder){
    this.category = this.formBuilder.group({
      name :['' , Validators.required],
    })
  }

  postCategory(){
    const categories = this.category.value
    this.categoryService.postCategory(categories).subscribe((data:any) =>{
      console.log(data);
      this.router.navigate(['/admin/category'])
    })
  }
}
