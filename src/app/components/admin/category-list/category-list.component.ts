import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categories: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategory()
  }

  getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe(
      (data: any) => {
        this.categories = data.category;
        console.log(this.categories);
      },
      (error) => console.log(error.message)
    );
  }
  removeCategoryId(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.categoryService.removeCategory(id).subscribe(
        () => {
          console.log("xóa thành công: ", id);
          this.categories = this.categories.filter((item: any) => item._id !== id);
        },
        (error) => console.log(error.message)
      );
    }
  }
}
