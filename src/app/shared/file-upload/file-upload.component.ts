import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth';
import { UserService } from 'src/app/modules/auth/_services/user.service';
import { CommonToastrService } from '../toater/common-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  APICONSTANT: any;

  public docUploadForm: FormGroup;
  public docsFormArray: FormArray;
  
  public moduleList:any=[];
  public docCategoryList:any=[];
  public docList:any=[];

  public filesToUpload: Array<File> = [];

  constructor(public formBuilder: FormBuilder,
    private toastrService: CommonToastrService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initDocUploadForm();
    this.getModules();
  }

  initDocUploadForm() {
    this.docUploadForm = this.formBuilder.group({
      docsFormArray: this.formBuilder.array([this.createDocs()]),
    });
  }
  createDocs(): FormGroup {
    return this.formBuilder.group({
      docModule: [null, Validators.compose([Validators.required])],
      docCategory: [null, Validators.compose([Validators.required])],
      docName: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])]
    });
  }
  addDocs(): void {
    this.docsFormArray = this.docUploadForm.get('docsFormArray') as FormArray;
    this.docsFormArray.push(this.createDocs());
  }
  removeDocs(index): void {
    this.docsFormArray.removeAt(index);
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.prepareDocForupload();
  }
  prepareDocForupload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("fileContent", files[i]);
      formData.append("docId", 'mano');
      formData.append("fileName", files[i]['name']);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    this.uploadDocs(formData)
  }
  uploadDocs(formData) {
    this.userService.uploadEmployeeDocs(formData).subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
        this.toastrService.showError('Documents Uploaded Successfully', this.APICONSTANT.TITLE);
      } else {
        this.toastrService.showError('Error While uploading Documents', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While uploading Documents', this.APICONSTANT.TITLE);
    });
  }
  getModules() {
    let options = ['MODULE_NAME'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['moduleName'] != null && masterData['moduleName'].length > 0) {
          this.moduleList = masterData['moduleName'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
    });
  }
  getUploadCategory(moduleId){
    let option = 'UPLOAD_CATG_ID';
    let param = {
      optionType: option,
      level1Value:moduleId
    }
    this.userService.getMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
          this.docCategoryList = res.data;
      } else {
        this.toastrService.showError(res.message, this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Document Category', this.APICONSTANT.TITLE);
    });
  }
  getDocTypes(docCategoryId){
    let option = 'DOC_TYPES';
    let param = {
      optionType: option,
      level1Value:docCategoryId
    }
    this.userService.getMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
          this.docList = res.data;
      } else {
        this.toastrService.showError(res.message, this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Documents', this.APICONSTANT.TITLE);
    });
  }
}
