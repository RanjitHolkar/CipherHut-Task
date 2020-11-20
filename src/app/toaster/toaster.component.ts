import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
public success = false;
public confirm = false;
public error = false;
public msg:any;
  constructor(private sharedService:SharedService) {
  }

  ngOnInit() {
    this.sharedService.toasterMessage.subscribe((res: any) =>{
      console.log(res);
      if(res.status == 'success') {
        this.successToastr(res.message);
      } else {
        this.errorToastr(res.message);
      }
    })
  }
  successToastr(msg:string){
    this.success = true;
    this.msg = msg;
    setTimeout(()=>{
      this.success = false;
    }, 3000);
  }
  errorToastr(msg:string){
    this.error = true;
    this.msg = msg;
    setTimeout(()=>{
      this.error = false;
    }, 3000);
  }
  confirmToastr(msg:string){
    this.confirm = true;
    this.msg = msg;
    setTimeout(()=>{
      this.confirm = false;
    }, 3000);
  }

}
