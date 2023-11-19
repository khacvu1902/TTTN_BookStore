import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.css']
})
export class AddressPageComponent {
  address:any = [];
  constructor(private addressService:AddressService , private router:Router){}
  ngOnInit(){
    this.getAddress()
  }

  getAddress(){
    this.addressService.getAddress().subscribe((data:any)=>{
      this.address = data.data
      console.log(this.address);
      console.log(this.address);
    })
  }

  removeAddress(id:any){
    this.addressService.deleteAddress(id).subscribe(()=>{
      this.address = this.address.filter((item:any)=> item._id !== id)
    })
  }

  updateAddress(id: any): void {
    this.router.navigate(['/address/update', id]);
  }
}
