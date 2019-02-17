import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeList();
  }

  resetForm(form?:NgForm){
     if(form)
      form.reset();
    this.employeeService.selectedEmployee={
      _id:"",
      name:"",
      position:"",
      office:"",
      salary:null
    }
  }

  onSubmit(form:NgForm){
    if(form.value._id ==""){
      this.employeeService.postForms(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeList();
      })
    }else{
      this.employeeService.putForms(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeList();
      })
    }
   
  }

  refreshEmployeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
       this.employeeService.employee = res as Employee[];
    });
  }

  onEdit(emp : Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id:String,form:NgForm){
    if (confirm("Are you sure?") == true) {
      this.employeeService.deleteForm(_id).subscribe((res)=>{
        this.refreshEmployeList();
        this.resetForm(form);
      })
    }
  }

}
