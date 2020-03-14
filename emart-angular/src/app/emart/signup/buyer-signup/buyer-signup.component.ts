import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from '../../Buyer';
import { EmartService } from '../../emart.service';

@Component({
  selector: 'app-buyer-signup',
  templateUrl: './buyer-signup.component.html',
  styleUrls: ['./buyer-signup.component.css']
})
export class BuyerSignupComponent implements OnInit {
  buyer: any;
    
  constructor(protected router: Router, protected emartService: EmartService) {
    this.buyer={
      username:'',
      password: '',
      email: '',
      mobile:'',
      date: new Date()
    }
    

  }

  ngOnInit(): void {

  }
  addBuyer() {

    

    this.emartService.addBuyer(this.buyer).subscribe(
      (response: any) => {

      }
    );
    
this.router.navigate(['/login']);

  }
}