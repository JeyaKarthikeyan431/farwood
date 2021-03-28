import { Component, Directive, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskDirective, NumberDirective } from 'src/app/shared/custom-validation/custom.directive';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  providers: [MaskDirective],
})
export class EmployeeProfileComponent implements OnInit {
  public officialInfoForm: FormGroup;
  public personalInfoForm: FormGroup;
  public salaryInfoForm: FormGroup;

  public family: FormArray;
  public education: FormArray;
  public company: FormArray;

  public designationList: any = [];
  public departmentList: any = [];
  public genderList: any = [];
  public maritalStatusList: any = [];
  public physicallyChallengedList: any = [];
  public nationalityList: any = [];
  public modeOfTransportList: any = [];
  public medicalHistoryList: any = [];
  public relationshipList: any = [];
  public occupationList: any = [];
  public qualificationList: any = [];
  public yearList: any = [];
  public workLocationList: any = [];

  APICONSTANT: any;
  maskConfig = {
    mask: [
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
    ],
    showMask: false,
    guide: false,
    placeholderChar: '_',
    keepCharPositions: true,
  };
  mindate = new Date();
  minDate = new Date(this.mindate.setDate(this.mindate.getDate()));

  constructor(public formBuilder: FormBuilder,
    private toastrService: CommonToastrService,
    private userService: UserService,) { 

    }

  ngOnInit(): void {
    this.initofficialInfoForm();
    this.initPersonalInfoForm();
    this.initSalaryInfoForm();
    this.getMasterData();
    this.APICONSTANT = this.userService.getConfig();
  }
  get o() {
    return this.officialInfoForm.controls;
  }
  get p() {
    return this.personalInfoForm.controls;
  }
  get s() {
    return this.salaryInfoForm.controls;
  }
  f(index) {
    let form = (<FormArray>this.personalInfoForm.get('family')).at(index);
    return form['controls'];
  }
  e(index) {
    let form = (<FormArray>this.personalInfoForm.get('education')).at(index);
    return form['controls'];
  }
  c(index) {
    let form = (<FormArray>this.personalInfoForm.get('company')).at(index);
    return form['controls'];
  }
  initofficialInfoForm() {
    this.officialInfoForm = this.formBuilder.group({
      offEmpId: [null, Validators.compose([Validators.minLength(1), Validators.maxLength(50)])],
      offEmpDateOfJoining: [null, Validators.compose([Validators.required])],
      offEmpDesignation: [null, Validators.compose([Validators.required])],
      offEmpDepartment: [null, Validators.compose([Validators.required])],
      offEmpReportingTo: [null, Validators.compose([Validators.required])],
      offEmpWorkLocation: [null, Validators.compose([Validators.required])],
      offEmpPhoto: [null, Validators.compose([Validators.required])],
      offEmpOffContactNo: [null, Validators.compose([Validators.required])],
      offEmpOfficialEmail: [null, Validators.compose([Validators.required])],
    });
  }

  initPersonalInfoForm() {
    this.personalInfoForm = this.formBuilder.group({
      perEmpFirstName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      perEmpLastName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      perEmpDob: [null, Validators.compose([Validators.required])],
      perEmpGender: [null, Validators.compose([Validators.required])],
      perEmpFatherName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      perEmpMotherName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      perEmpMaritalStatus: [null, Validators.compose([Validators.required])],
      perEmpSpouceName: [null, Validators.compose([Validators.required])],
      perEmpChildrenName: [null, Validators.compose([Validators.required])],
      perEmpResidence: [null, Validators.compose([Validators.required])],
      perEmpSameAsPermanentResidence: [null, Validators.compose([Validators.required])],
      perEmpPermanentResidence: [null, Validators.compose([Validators.required])],
      perEmpNationality: [null, Validators.compose([Validators.required])],
      perEmpEmergencyContactNo: [null, Validators.compose([Validators.required])],
      perEmpPhysicallyChallenged: [null, Validators.compose([Validators.required])],
      perEmpPersonalContactNo: [null],
      perEmpPersonalEmail: [null],
      perEmpModeOfTransport: [null, Validators.compose([Validators.required])],
      perEmpMedicalHistory: [null],
      perEmpMedicalHistoryDesc: [null, Validators.compose([Validators.required])],
      family: this.formBuilder.array([this.createFamily()]),
      education: this.formBuilder.array([this.createEducation()]),
      company: this.formBuilder.array([this.createCompany()])
    });
  }
  initSalaryInfoForm() {
    this.salaryInfoForm = this.formBuilder.group({
      ctcPerMonth: [null],
      ctcPerAnnum: [null],
      basic: [null],
      hra: [null],
      conveyance: [null],
      mobileReimbursement: [null],
      specialAllowance: [null],
      gross: [null],
      employerEPF: [null],
      employerESIC: [null],
      variablePay: [null],
      uan: [null],
    })
  }
  createFamily(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      relationship: [null, Validators.compose([Validators.required])],
      age: [null, Validators.compose([Validators.required])],
      occupation: [null]
    });
  }
  createEducation() {
    return this.formBuilder.group({
      qualification: [null, Validators.compose([Validators.required])],
      institute: [null, Validators.compose([Validators.required])],
      yearOfPassedOut: [null, Validators.compose([Validators.required])],
      grade: [null, Validators.compose([Validators.required])],
      certificate: [null]
    });
  }
  createCompany() {
    return this.formBuilder.group({
      companyName: [null, Validators.compose([Validators.required])],
      fromYear: [null, Validators.compose([Validators.required])],
      toYear: [null, Validators.compose([Validators.required])],
      designation: [null, Validators.compose([Validators.required])],
      reasonForLeaving: [null],
      reference: [null, Validators.compose([Validators.required])],
      releavingLetter: [null]
    });
  }
  addFamily(): void {
    this.family = this.personalInfoForm.get('family') as FormArray;
    this.family.push(this.createFamily());
  }
  removeFamily(index): void {
    this.family.removeAt(index);
  }
  addEducation(): void {
    this.education = this.personalInfoForm.get('education') as FormArray;
    this.education.push(this.createEducation());
  }
  removeEducation(index): void {
    this.education.removeAt(index);
  }
  addCompany(): void {
    this.company = this.personalInfoForm.get('company') as FormArray;
    this.company.push(this.createCompany());
  }
  removeCompany(index): void {
    this.company.removeAt(index);
  }
  getMasterData() {
    let options = ['USER_DESIGNATION', 'USER_DEPT', 'MARITAL_STATUS', 'GENDER', 'NATIONALITY', 'COMMUTE_MODE',
      , 'WRK_LOC', 'EMP_QUALIFICATION', 'QUESTION_TYPE', 'RELATIONSHIP', 'YEAR','OCCUPATION'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['maritalStatus'] != null && masterData['maritalStatus'].length > 0
          && masterData['gender'] != null && masterData['gender'].length > 0
          && masterData['nationality'] != null && masterData['nationality'].length > 0
          && masterData['commuteMode'] != null && masterData['commuteMode'].length > 0
          && masterData['workLocation'] != null && masterData['workLocation'].length > 0
          && masterData['employeeQualification'] != null && masterData['employeeQualification'].length > 0
          && masterData['questionType'] != null && masterData['questionType'].length > 0
          && masterData['year'] != null && masterData['year'].length > 0
          && masterData['relationship'] != null && masterData['relationship'].length > 0) {
          this.designationList = masterData['userDesignation'];
          this.departmentList = masterData['userDepartment'];
          this.maritalStatusList = masterData['maritalStatus'];
          this.genderList = masterData['gender'];
          this.nationalityList = masterData['nationality'];
          this.modeOfTransportList = masterData['commuteMode'];
          this.workLocationList = masterData['workLocation'];
          this.qualificationList = masterData['employeeQualification'];
          this.physicallyChallengedList = masterData['questionType'];
          this.medicalHistoryList = masterData['questionType'];
          this.yearList = masterData['year'];
          this.relationshipList = masterData['relationship'];
          this.occupationList=masterData['occupation'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', 'Error');
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', 'Error');
    });
  }
  setSameAsPermanent(checked) {
    this.personalInfoForm.controls['perEmpPermanentResidence'].setValue('');
    let perEmpResidence = this.personalInfoForm.controls['perEmpResidence'].value;
    if (checked && perEmpResidence != null && perEmpResidence != '') {
      this.personalInfoForm.controls['perEmpPermanentResidence'].setValue(perEmpResidence);
    } else {
      this.personalInfoForm.controls['perEmpResidence'].markAsTouched();
    }
  }
  submit() {
    let param = {
      officialInfo: this.officialInfoForm.value,
      personalInfo: this.personalInfoForm.value,
      salaryInfo: this.salaryInfoForm.value
    }
    console.log(param);
    this.userService.updateUser(param).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.hideForm();
        this.toastrService.showSuccess(res.message, this.APICONSTANT.TITLE);
      } else {
        this.toastrService.showError(res.message, this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      if (error.status == 500) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else if (error.status == 204) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else {
        this.toastrService.showError('Error While Updating User', this.APICONSTANT.TITLE);
      }
    });
  }
onMakeDicimal(event, control){
  if (event.target.value != '') {
    let value = event.target.value;
    let removeComma = value.toString().replace(/,/g, '');
      let withoutDecimal = removeComma.split('.');
      if (/^\d+$/.test(withoutDecimal[0])) {
        let decimalValue = withoutDecimal[0] + '.00';
        let commaSepNum = decimalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.salaryInfoForm.controls[control].setValue(
        commaSepNum
      );
    }
}

}
}