import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient)  { }

  private _getHeaders():Headers {
    let header = new Headers({
      'Content-Type': 'application/json'
    });

    return header;
  }
  /* Get All Employee data */
  getEmpList() {
    return this.httpClient.get<any>(environment.baseUrl+'employees');
  }
  /* Get Employee Details */
  getEmpDetails(empId:number) {
    return this.httpClient.get<any>(environment.baseUrl+'employee/'+empId);
  }
  /* Add Employee Details */
  addEmpDetails(empInfo:any) {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    // headers=headers.append('content-type','application/x-www-form-urlencoded');
    return this.httpClient.post<any>(environment.baseUrl+'create',empInfo,{headers:headers});
  }

  /* Update Employee Details */
  updateEmpDetails(empInfo:any,id:number) {
    // let headers = new HttpHeaders()
    // headers=headers.append('content-type','application/json')
    // headers=headers.append('Access-Control-Allow-Origin', '*')
    // headers=headers.append('content-type','application/x-www-form-urlencoded');
    return this.httpClient.put<any>(environment.baseUrl+'update/'+id,empInfo).pipe(map(res =>{
      return res;
    }));
  }
  /* Delete Employee Details*/
  deleteEmployee(empId:number) {
    return this.httpClient.delete<any>(environment.baseUrl+'delete/'+empId);
  }
}
