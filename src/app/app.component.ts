import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management';
  constructor(private router:Router,private sharedService:SharedService) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.sharedService.spinner.next({status:true});
      }
      if(event instanceof NavigationEnd) {
        this.sharedService.spinner.next({status:false});
      }
      if(event instanceof NavigationError) {
        this.sharedService.spinner.next({status:false});
      }
      if(event instanceof NavigationCancel) {
        this.sharedService.spinner.next({status:false});
      }
    });
  }
}
