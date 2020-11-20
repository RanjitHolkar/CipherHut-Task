import { Injectable, ViewChild } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';
import { SharedService } from '../services/shared.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private sharedService:SharedService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.router.navigate(['/erroe404']);
      } else if (err.status != 200) {
        this.sharedService.spinner.next({status:false});
        this.sharedService.toasterMessage.next({status:'error',message:err.error.message});
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
