import { Component, OnInit } from '@angular/core';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  leadInfo:any;
  leadId:any=null;
  APICONSTANT: any;
  constructor(private userService: UserService,private toastrService: CommonToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getLeadInfo();
  }
  redirectTo(form){
    this.userService.salesFormNavigate(form);
  }
  getLeadInfo() {
    let leadId = this.authService.decrypt(sessionStorage.getItem('leadId'));
    if (leadId != null && leadId != '') {
      this.leadId=leadId;
      this.getLeadInfoById(leadId);
    }else{
      this.leadId=null;
    }
  }
  getLeadInfoById(leadId) {
    this.userService.getLeadById(leadId).subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
          this.leadInfo=res.data;
          console.log(this.leadInfo);
      } else {
        this.toastrService.showError('No Lead Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Lead', this.APICONSTANT.TITLE);
    });
  }

}
