import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  personalInfoForm: FormGroup;

  typeOfCustomerList:any=[];
  leadSourceList:any=[];


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPersonalForm();
  }

  initPersonalForm() {
    this.personalInfoForm = this.formBuilder.group({
      typeOfCustomer: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      leadSource: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      referencedBy: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      projectName: [null],
      contactNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      alternativeContactNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      personalEmailId: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      flat: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      streetName: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      pinCode: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      location: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
    });
  }
  get p() {
    return this.personalInfoForm.controls;
  }
}
