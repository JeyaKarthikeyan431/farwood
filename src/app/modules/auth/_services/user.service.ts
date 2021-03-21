import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  visibility: BehaviorSubject<boolean>;
  userInfo: BehaviorSubject<any>;

  apiConstant: any;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiConstant = this.configService.getConfig();
    this.visibility = new BehaviorSubject(false);
    this.userInfo = new BehaviorSubject('');
  }
  getConfig() {
    return this.apiConstant;
  }
  getMasterData(param) {
    return this.http.post(this.apiConstant.API_ENDPOINT + 'portal/options/listAll', param);
  }
  createUser(param) {
    return this.http.post(this.apiConstant.API_ENDPOINT + 'login/createUser', param);
  }
  updateUser(param) {
    return this.http.put(this.apiConstant.API_ENDPOINT + 'login/updateUser', param);
  }
  showForm() {
    this.visibility.next(true);
  }

  hideForm() {
    this.visibility.next(false);
  }
  getUsers() {
    return this.http.get(this.apiConstant.API_ENDPOINT + 'login/getUsers');
  }
  getUserInfo(data) {
    this.userInfo.next(data);
  }
}
