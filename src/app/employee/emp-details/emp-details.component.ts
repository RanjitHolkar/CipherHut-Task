import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/Encrypt-decrypt/encrypt-decrypt.service';
import { SharedService } from 'src/app/services/shared.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
public empId:any;
public employeeDetails:any = Object;
  constructor(
    private encryptDecrypt:EncryptDecryptService,
    private activateRoute:ActivatedRoute,
    private employeeService:EmployeeService,
    private sharedService:SharedService,
    private location:Location) {

  }

  ngOnInit(): void {
    this.sharedService.empDetails.subscribe(res =>{
      this.employeeDetails = res;
    })
    if(!this.employeeDetails || this.employeeDetails == Object) {
      this.backPage();
    }
  }
  /* Get Employee Details */
  getEmpDetails(empId:number) {
    this.employeeService.getEmpDetails(empId).subscribe(res =>{
      if(res.status == 'success') {
        this.employeeDetails = res.data;
        console.log(this.employeeDetails);
      }
    })
  }
  /* Redirect To Back Page */
  backPage() {
    this.location.back()
  }

}
