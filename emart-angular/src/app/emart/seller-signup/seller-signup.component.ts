import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmartService } from '../emart.service';


@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent implements OnInit {
  seller: any;
  constructor(protected router: Router, protected emartService: EmartService) {
    this.seller = {
      username: '',
      password: '',
      company: '',
      brief: '',
      gst: 0,
      address: '',
      email: '',
      contact: '',
      website: ''

    }
  }

  ngOnInit(): void {
  }
  addSeller() {
    this.emartService.addSeller(this.seller).subscribe(
      (response: any) => {

      }
    );
    this.router.navigate(['/login']);
  }

}