import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
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

  constructor(public formBuilder: FormBuilder,
    private toastrService: CommonToastrService,
    private userService: UserService,) { }

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
      offEmpId: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
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
      perEmpFirstName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      perEmpLastName: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      perEmpDob: [null, Validators.compose([Validators.required])],
      perEmpGender: [null, Validators.compose([Validators.required])],
      perEmpFatherName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      perEmpMotherName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      perEmpMaritalStatus: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      perEmpSpouceName: [null, Validators.compose([Validators.required])],
      perEmpChildrenName: [null, Validators.compose([Validators.required])],
      perEmpResidence: [null, Validators.compose([Validators.required])],
      perEmpSameAsPermanentResidence: [null, Validators.compose([Validators.required])],
      perEmpPermanentResidence: [null, Validators.compose([Validators.required])],
      perEmpNationality: [null, Validators.compose([Validators.required])],
      perEmpEmergencyContactNo: [null, Validators.compose([Validators.required])],
      perEmpPhysicallyChallenged: [null, Validators.compose([Validators.required])],
      perEmpPersonalContactNo: [null, Validators.compose([Validators.required])],
      perEmpPersonalEmail: [null, Validators.compose([Validators.required])],
      perEmpModeOfTransport: [null, Validators.compose([Validators.required])],
      perEmpMedicalHistory: [null, Validators.compose([Validators.required])],
      perEmpMedicalHistoryDesc: [null, Validators.compose([Validators.required])],
      family: this.formBuilder.array([this.createFamily()]),
      education: this.formBuilder.array([this.createEducation()]),
      company: this.formBuilder.array([this.createCompany()])
    });
  }
  initSalaryInfoForm() {
    this.salaryInfoForm = this.formBuilder.group({
      ctcPerMonth: [null, Validators.compose([Validators.required])],
      ctcPerAnnum: [null, Validators.compose([Validators.required])],
      basic: [null, Validators.compose([Validators.required])],
      hra: [null, Validators.compose([Validators.required])],
      conveyance: [null, Validators.compose([Validators.required])],
      mobileReimbursement: [null, Validators.compose([Validators.required])],
      specialAllowance: [null, Validators.compose([Validators.required])],
      gross: [null, Validators.compose([Validators.required])],
      employerEPF: [null, Validators.compose([Validators.required])],
      employerESIC: [null, Validators.compose([Validators.required])],
      variablePay: [null, Validators.compose([Validators.required])],
      uan: [null, Validators.compose([Validators.required])],
    })
  }
  createFamily(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      relationship: [null, Validators.compose([Validators.required])],
      age: [null, Validators.compose([Validators.required])],
      occupation: [null, Validators.compose([Validators.required])]
    });
  }
  createEducation() {
    return this.formBuilder.group({
      qualification: [null, Validators.compose([Validators.required])],
      institute: [null, Validators.compose([Validators.required])],
      yearOfPassedOut: [null, Validators.compose([Validators.required])],
      grade: [null, Validators.compose([Validators.required])],
      certificate: [null, Validators.compose([Validators.required])]
    });
  }
  createCompany() {
    return this.formBuilder.group({
      companyName: [null, Validators.compose([Validators.required])],
      fromYear: [null, Validators.compose([Validators.required])],
      toYear: [null, Validators.compose([Validators.required])],
      designation: [null, Validators.compose([Validators.required])],
      reasonForLeaving: [null, Validators.compose([Validators.required])],
      reference: [null, Validators.compose([Validators.required])],
      releavingLetter: [null, Validators.compose([Validators.required])]
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
      , 'WRK_LOC', 'EMP_QUALIFICATION', 'QUESTION_TYPE', 'RELATIONSHIP', 'YEAR'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getMasterData(param).subscribe((res: any) => {
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
}
