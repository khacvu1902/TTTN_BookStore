import { Component , OnInit ,ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: any[]=[];
  showSuccessMessage: boolean = false;
  dataSource: MatTableDataSource<any>;
  totalItems: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['name', 'image' , 'price','sale', 'description', 'quantity', 'category' , 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator|any;

  constructor(private productsService: ProductsService,private cdRef: ChangeDetectorRef , private router: Router , private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.product = data.data;
      console.log(this.product);
      this.dataSource = new MatTableDataSource(this.product);
      this.totalItems = this.product;
      this.dataSource.paginator = this.paginator;
    });
  }

  removeProducts(id: any): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productsService.removeProducts(id).subscribe(
        () => {
          console.log("xóa thành công: ", id);
          this.product = this.product.filter((item: any) => item._id !== id);
          this.showSuccessMessage = true; // Hiển thị thông báo xóa thành công
          this.render(); // Kích hoạt sự kiện render
          this.reloadComponent();

        },
        (error) => console.log(error.message)
      );
    }
  }

  render(): void {
    setTimeout(() => {
      this.showSuccessMessage = false; // Ẩn thông báo sau 2 giây
    }, 2000); // 2000 milliseconds = 2 giây
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

  updateProduct(id: any): void {
    this.router.navigate(['/admin/updateProducts', id]);
  }

}
