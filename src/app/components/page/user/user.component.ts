import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: FormGroup
  id: any = ''
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.formBuilder.group({
      name: [''],
      email: [''],
      gender: [''],
      dateOfBirth: [''],
    });
    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'));
      this.id = id; // Store the product ID
      this.fetchProductData(id); // Fetch product data based on ID
    });
  }


  fetchProductData(id: string) {
    this.authService.getUsers(id).subscribe(
      (userData: any) => {
        console.log(userData);
        this.user.patchValue({
          name: userData.message.name,
          email: userData.message.email,
          gender: userData.message.gender,
          dateOfBirth: userData.message.dateOfBirth
        });
        console.log(this.user.value);
      },
      (error) => {
        console.log('Error fetching product data:', error);
        // You can add error handling here
      }
    );
  }


  updateAuth() {
    const valueProduct = this.user.value; // Thay đổi thành this.user.value để truyền dữ liệu từ FormGroup
    this.authService.updateAuth(this.id, valueProduct).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/admin/products']);
      },
      (error) => {
        console.log('Error updating product data:', error);
        // Bạn có thể thêm xử lý lỗi ở đây
      }
    );
  }
}
