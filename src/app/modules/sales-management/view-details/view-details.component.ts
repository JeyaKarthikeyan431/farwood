import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  redirectTo(form){
    this.userService.salesFormNavigate(form);
  }

}
