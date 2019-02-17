import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {

  selectedEmployee :  Employee;
  employee : Employee[];
  readonly baseURL = "http://localhost:3000/employee";
  constructor(private http : HttpClient) { }

  postForms(emp:Employee){
   return this.http.post(this.baseURL,emp);
  }

  getEmployeeList(){
    return this.http.get(this.baseURL);
  }

  putForms(emp:Employee){
    return this.http.put(this.baseURL+`/${emp._id}`,emp);
  }

  deleteForm(_id:String){
    return this.http.delete(this.baseURL+`/${_id}`);
  }

}
