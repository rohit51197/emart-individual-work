import { Injectable } from '@angular/core';
import { Category } from './category';
import { SubCategory } from './Sub-category';
import { Item } from './item';
import { Cart } from './cart';
import { Bill } from './bill';
import { Seller } from './seller';
import { Buyer } from './buyer';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmartService {

  categories: Category[];
  subCategories: SubCategory[];
  allItems: any;
  cartItems: Item[];
  allBills: any;
  currentBuyer: any;
  allSellers: Seller[];


  constructor(protected http: HttpClient) {

    this.cartItems = [];
    this.allBills = [];

  }
  /*Retrieving all items with end point */
  getAllItems() {
    return this.http.get("http://localhost:8083/BuyerItemService/emart/item/all");

  }
  /* Retrieving category details */
  getCategories(): Category[] {
    return [].concat(this.categories);
  }
  /* Retrieving subcategory details */
  getSubCategories(): SubCategory[] {
    return [].concat(this.subCategories);
  }
  getAllBills(): any {
    return this.allBills;
  }
  setBuyerAndBills(currentBuyer) {
    this.currentBuyer = currentBuyer;
    this.allBills = currentBuyer.allBills
  }

  getCategory(catId: number): Category {
    let category: Category;
    let size = this.categories.length;
    for (let i = 0; i < size; i++) {
      if (this.categories[i].id == catId) {
        category = {
          id: this.categories[i].id,
          name: this.categories[i].name,
          brief: this.categories[i].brief
        };
        break;
      }
    }

    return category;
  }
  getSubCategory(catId: number): SubCategory {
    let subCategory: SubCategory;
    let size = this.subCategories.length;
    for (let i = 0; i < size; i++) {
      if (this.subCategories[i].id == catId) {
        subCategory = {
          id: this.subCategories[i].id,
          name: this.subCategories[i].name,
          brief: this.subCategories[i].brief,
          categoryId: this.subCategories[i].categoryId,
          gstPercent: this.subCategories[i].gstPercent
        };
        break;
      }
    }
    return subCategory;
  }
  getItem(itemId: string): any {
    /* let item: Item;
     let size = this.allItems.length;
     for (let i = 0; i < size; i++) {
       if (this.allItems[i].id == +itemId) {
         //item = this.allItems[i];
         item = {
 
           id: this.allItems[i].id,
           name: this.allItems[i].name,
           categoryId: this.allItems[i].categoryId,
           subCategoryId: this.allItems[i].subCategoryId,
           price: this.allItems[i].price,
           description: this.allItems[i].description,
           stock: this.allItems[i].stock,
           remarks: this.allItems[i].remarks,
           image: this.allItems[i].image
         };
         break;
       }
     }
     return item;*/
    return this.http.get('http://localhost:8083/BuyerItemService/emart/item/' + itemId);
  }
  getcurrentBuyer() {
    return this.currentBuyer;
  }
  /*Pushing items into cart*/
  addToCart(item: any) {
  
    this.cartItems.push(item);


  }

  /*Retrieving The Cart Items */
  getAllCart() {
    return [].concat(this.cartItems);

  }
  getCurrentBuyer() {
    return this.currentBuyer;
  }
 
  /*Deleting cart Items */
  deleteCartItem(itemNo: number) {
    let size = this.cartItems.length;
    for (let i = 0; i < size; i++) {
      if (this.cartItems[i].id == itemNo) {
        this.cartItems.splice(i, 1);
        break;
      }
    }

  }
  
  /* Importing cart Array values into bill-view   */
  addBill(todayDate: Date, total: number) {
    let allBillDetails: any[] = [];
    for (let i = 0; i < this.cartItems.length; i++) {
      allBillDetails.push({
        billDetailsId: 0,
        bill: null,
        item: this.cartItems[i]

      });
    }

    let bill: any = {
      id: 0,
      type: 'Debit',
      date: todayDate,
      remarks: 'paid',
      amount: total,
      buyer: {
        id: this.currentBuyer.id
      },
      allBillDetails: allBillDetails

    }
    this.cartItems = [];
    return this.http.post("http://localhost:8083/BuyerItemService/emart/bill", bill);
  }
/*Getting Buyer Details using End Point */
  getBuyer() {
    return this.http.get("http://localhost:8083/LoginService/emart/buyer/" + this.currentBuyer.id);
  }

  addBuyer(buyer: Buyer): any {
    console.log(this.addBuyer);
    return this.http.post("http://localhost:8083/BuyerSignupService/emart/buyer", buyer);
    
    
  }

  addSeller(seller:Seller):any{
    return this.http.post("http://localhost:8083/SellerSignupService/emart/seller",seller);
  }

  existBuyer(){
    return this.currentBuyer

  }
   


  validateBuyer(username: string, password: string) {
   
    let credentials = username + ':' + password;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', credentials);
    return this.http.get("http://localhost:8083/LoginService/emart/validate", { headers });

  }
  validateSeller(username: string, password: string) {
    
  }

}
