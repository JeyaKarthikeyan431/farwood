import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
interface MOM {
  mid: string;
  requirement: string;
  actionBy: string;
  dueDate: string;
  action: string,
}

@Component({
  selector: 'app-create-mom',
  templateUrl: './create-mom.component.html',
  styleUrls: ['./create-mom.component.scss']
})
export class CreateMomComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  momInfoForm:FormGroup;

  displayedColumns: string[] = ['mid', 'requirement', 'actionBy', 'dueDate', 'action'];
  dataSource: MatTableDataSource<MOM>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initMomInfoForm();
  }
  initMomInfoForm() {
    this.momInfoForm = this.formBuilder.group({
      organiser: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      salesPerson: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      architect: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      designer: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      client: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      coordinator: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
    });
  }
  get m() {
    return this.momInfoForm.controls;
  }
}
