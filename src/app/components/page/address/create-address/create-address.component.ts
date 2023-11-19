import { Component } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent {
  address: FormGroup;
  dc:any

  constructor( private router:Router , 
    private formBuilder: FormBuilder ,
    private addressService:AddressService,
    private authService:AuthService) {
    this.address = this.formBuilder.group({
      user: [''],
      address :[''],
      phone :[''],
    })
  }
  ngOnInit(){
    this.postAddress()
  }


  postAddress(){
    const valueAddress = this.address.value
    const user = JSON.parse(this.authService.getUserLocal());
    const userId = user._id;
    valueAddress.user = userId
    this.addressService.CreateAddress(valueAddress).subscribe(
      (data:any)=>{
        this.dc = data
        console.log(this.dc);
        this.addressService.saveIdAddress(this.dc)
        console.log(data);
        this.router.navigate(['/address']);
      }
    )
  }
}
