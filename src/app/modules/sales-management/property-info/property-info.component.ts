import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.scss']
})
export class PropertyInfoComponent implements OnInit {
  propertyInfoForm:FormGroup;

  lookingForList:any=[];
  propertyList:any=[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPropertyInfoForm();
  }
  initPropertyInfoForm() {
    this.propertyInfoForm = this.formBuilder.group({
      lookingFor: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      typeOfProperty: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      propertyName: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      builderName: [null, Validators.compose([Validators.required])],
      buildingState: [null, Validators.compose([Validators.required])],
      expectedDate: [null],
      flat: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      streetName: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      pinCode: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      location: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
    });
  }
  get p() {
    return this.propertyInfoForm.controls;
  }

}
