import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  auth: FormGroup;
  categories: any[] = [];

  constructor( private authService: AuthService , private router:Router , private formBuilder: FormBuilder) {
    this.auth = this.formBuilder.group({
      email:[''],
      password:[''],
    })
  }
  ngOnInit(){
    this.Signin()
  }

  Signin(){
    const valueAuth = this.auth.value
    this.authService.login(valueAuth).subscribe(
      (data:any)=>{
        console.log(data);
        this.authService.savetoken(data.accessToken)
        this.authService.saveUser(data.user)
        this.router.navigate(['/']);
      }
    )
  }

}
