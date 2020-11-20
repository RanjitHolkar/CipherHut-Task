import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginTime:any;
  constructor() {
    this.loginTime = sessionStorage.getItem('empUserTime');
  }

  ngOnInit(): void {
  }

}
