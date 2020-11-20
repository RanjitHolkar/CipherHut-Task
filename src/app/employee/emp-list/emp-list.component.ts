import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/Encrypt-decrypt/encrypt-decrypt.service';
import { SharedService } from 'src/app/services/shared.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
public employees:Employee[] = [];
public submitted:Boolean = false;
public action:Boolean = false;
public editDetails:any;
public editIndex:any;
public formTitle:any = 'Add';
public actionEmpForm!:FormGroup;
  constructor(
    private employeeService:EmployeeService,
    private sharedService:SharedService,
    private fb:FormBuilder,
    private encryptDecrypt:EncryptDecryptService,
    private router:Router) {
    this.getEmpList();
  }

  ngOnInit(): void {
    this.actionEmpForm = this.fb.group({
      name:['',Validators.required],
      salary:['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      age:['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    })
  }

  /* Get All Employee data */
  getEmpList() {
    this.sharedService.spinner.next({status:true,borderColor:'blue',message:'Please wait getting employee details.'});
    this.employeeService.getEmpList().subscribe(res =>{
      if(res.status == 'success') {
        this.employees = res.data;
      }
      this.sharedService.spinner.next({status:false});
    })
  }

  /* View Employe Details */
  viewEmpDetails(index:number) {
    let data =Object.assign(this.employees[index]);
    this.sharedService.empDetails.next(data);
    this.router.navigate(['/emp-details']);
  }
  /* Return Form Controls */
  get f(){ return this.actionEmpForm.controls}

  formSubmit() {
    this.submitted = true;
    // check form is valid or not
    if(this.actionEmpForm.valid) {
      let data = this.actionEmpForm.value;
      if(this.formTitle == 'Add') {
        this.addEmployee();
      } else {
        this.saveEmpEditDetails();
      }
    }
  }

  /* Add Employee */
  addEmployee() {
    this.sharedService.spinner.next({status:true,borderColor:'blue',message:'Please wait adding employee.'});
    this.employeeService.addEmpDetails(this.actionEmpForm.value).subscribe(res => {
      if(res.status == 'success'){
        this.action = false;
        this.sharedService.toasterMessage.next({status:'success',message:res.message});
        this.employees.push(res.data);
      } else {
        this.sharedService.toasterMessage.next({status:'error',message:res.message});
      }
      this.sharedService.spinner.next({status:false});
    })
  }

  /* Edit Employee Details */
  editEmployeeDetails(index:number) {
    this.formTitle = 'Edit';
    this.editIndex = index;
    this.editDetails = this.employees[index];
    this.actionEmpForm.patchValue({
      name:this.editDetails.employee_name,
      salary:this.editDetails.employee_salary,
      age:this.editDetails.employee_age
    })
    this.action = true;
  }

  /* Save Updated Employee Details */
  saveEmpEditDetails() {
    this.sharedService.spinner.next({status:true,borderColor:'blue',message:'Please wait updating employee details.'});
    this.employeeService.updateEmpDetails(this.actionEmpForm.value,this.editDetails.id).subscribe(res =>{
      if(res.status == 'success'){
        this.action = false;
        this.sharedService.toasterMessage.next({status:'success',message:res.message});
        this.employees[this.editIndex] = res.data;
      } else {
        this.sharedService.toasterMessage.next({status:'error',message:res.message});
      }
      this.sharedService.spinner.next({status:false});
    })
  }

  deleteEmployee(index:number) {
    if(confirm('are you sure you want to delete this Employee?')){
      this.sharedService.spinner.next({status:true,borderColor:'red',message:'Please wait detating employee.'});
      this.employeeService.deleteEmployee(this.employees[index].id).subscribe(res =>{
        if(res.status) {
          this.employees.splice(index, 1);
          this.sharedService.toasterMessage.next({status:'success',message:res.message});
        } else {
          this.sharedService.toasterMessage.next({status:'error',message:res.message});
        }
        this.sharedService.spinner.next({status:false});
      })
    }
  }
  /* Track By */
  trackByFn(index: any, item: any) {
    return index; // or employee.id
  }



}
