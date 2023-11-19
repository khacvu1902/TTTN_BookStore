import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  auth: FormGroup;
  categories: any[] = [];

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.auth = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    })
  }
  ngOnInit() {
    this.Signup()
  }

  Signup() {
    const valueAuth = this.auth.value
    this.authService.register(valueAuth).subscribe(
      (data: any) => {
        console.log(data);
        this.authService.savetoken(data.accessToken)
        this.authService.saveUser(data.user)
        this.router.navigate(['/signin']);
      }
    )
  }
}
