import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  firstname: string = "";
  
  constructor(private apiServ: ApiService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.firstname);
  }

  logout(){
    this.apiServ.logout().subscribe(responseBody => {
      this.router.navigate(["/"]);
    })
  }

}
