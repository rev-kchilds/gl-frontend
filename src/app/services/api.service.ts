import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isLoggedIn: boolean = false;
  domain: string = environment.serverDomain;

  constructor(private httpCli: HttpClient) { }


  login(account: Account){
    return this.httpCli.post<any>(`${this.domain}/session`, {
      "username": account.username,
      "password": account.password
    }, {withCredentials: true});
  }

  logout(){
    return this.httpCli.delete<any>(`${this.domain}/session`, {withCredentials: true});
  }

  checkSession(){
    return this.httpCli.get<any>(`${this.domain}/session`, {withCredentials: true});
  }

  registerAccount(account: Account){
    return this.httpCli.post<any>(`${this.domain}/account`, {
      "username": account.username,
      "password": account.password,
      "firstname": account.firstname,
      "lastname": account.lastname
    });
  }

  createItem(accountId: number, itemName: string){
    return this.httpCli.post<any>(`${this.domain}/account/${accountId}/item`,{
      "name": itemName
    });
  }

  getAllItems(accountId: number){
    return this.httpCli.get<any>(`${this.domain}/account/${accountId}/item`);
  }

  toggleInCart(accountId: number, itemId: number){
    return this.httpCli.patch<any>(`${this.domain}/account/${accountId}/item/${itemId}`, null);
  }

  deleteOneItem(accountId: number, itemId: number){
    return this.httpCli.delete<any>(`${this.domain}/account/${accountId}/item/${itemId}`);
  }

  deleteAllInCartItems(accountId: number){
    return this.httpCli.delete<any>(`${this.domain}/account/${accountId}/item`);
  }
}
