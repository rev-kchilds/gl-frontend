import { Component, DoCheck, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit/* , DoCheck */ {

  isLoggedIn: boolean = false;
  constructor(private apiServ: ApiService) { }

  ngOnInit(): void {
  }

  /* ngDoCheck(){
    this.isLoggedIn = this.apiServ.isLoggedIn;

    if(this.apiServ.isLoggedIn)
      return;

    this.apiServ.checkSession().subscribe(responseBody => {
      console.log("nav bar check session")
      this.isLoggedIn = responseBody.data;
    })  
  } */

}
