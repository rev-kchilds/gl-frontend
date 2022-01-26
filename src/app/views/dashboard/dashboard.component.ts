import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/Account';
import { Item } from 'src/app/models/Item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

  account: Account = {} as Account;
  isCartEmpty: boolean = true; 
  itemInput: string = "";
  items: Array<Item> = [];

  constructor(private apiServ: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.apiServ.checkSession().subscribe(responseBody => {
      this.apiServ.isLoggedIn = responseBody.data;
      
      if(!responseBody.data){
        this.router.navigate(["/"]);
      }

      this.account = responseBody.data;
      this.getAllItems();
    })

    
  }

  ngDoCheck(){
    this.isCartEmpty = true;
    this.items.forEach(item => {
      if(item.inCart)
        this.isCartEmpty = false;
    })
  }

  getAllItems(){
    this.apiServ.getAllItems(this.account.id).subscribe(responseBody => {
      console.log(responseBody);
      this.items = responseBody.data;
      this.items.sort((a,b) => a.id - b.id) 
    })
  }

  createItem(){
    this.apiServ.createItem(this.account.id, this.itemInput).subscribe(responseBody => {
      console.log(responseBody);
      let item: Item = responseBody.data;
      this.items.push(item);
    });
  }

  toggleCart(event: any){
    console.log(event.target.id)
    this.apiServ.toggleInCart(this.account.id, event.target.id).subscribe(responseBody => {
      console.log(responseBody)
      this.items.forEach(element => {
        if(element.id == event.target.id)
          element.inCart = !element.inCart;
      });
    })
  }

  deleteItem(event: any){
    event.stopPropagation();
    console.log(event.target.parentElement.id);
    this.apiServ.deleteOneItem(this.account.id,event.target.parentElement.id).subscribe(responseBody => {
      console.log(responseBody);
      let index = 0;
      this.items.forEach((element, i) => {
        if(element.id == event.target.parentElement.id)
          index = i;
      });
      this.items.splice(index, 1);
    })
  }

  deleteAllInCartItems(){
    this.apiServ.deleteAllInCartItems(this.account.id).subscribe(responseBody => {
      this.getAllItems();
    })
  }



}
