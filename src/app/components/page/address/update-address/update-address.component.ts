import { Component } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {
  address: FormGroup;
  addressId: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.address = this.formBuilder.group({
      user: [''],
      address: [''],
      phone: [''],
    })
    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'));
      this.addressId = id; // Store the product ID
      this.fetchAddressData(id); // Fetch product data based on ID
    });
  }

  fetchAddressData(id: string) {
    this.addressService.getOneAddress(id).subscribe(
      (data) => {
        this.address.patchValue(data.data);
      },
      (error) => {
        console.log('Error fetching product data:', error);
        // You can add error handling here
      }
    );
  }

  updateAddress() {
    const valueAddress = this.address.value
    const accessToken = this.authService.getAccessToken()
    const user = JSON.parse(this.authService.getUserLocal());
    const userId = user._id;
    valueAddress.user = userId
    this.addressService.UpdateAddress(this.addressId,valueAddress).subscribe(
      (data: any) => {
        console.log(data.data);
        this.router.navigate(['/address']);
      }
    )
  }

}
