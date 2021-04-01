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
  salesNavigation$: BehaviorSubject<string>;
  momNavigation$:BehaviorSubject<string>;

  apiConstant: any;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiConstant = this.configService.getConfig();
    this.visibility = new BehaviorSubject(false);
    this.userInfo = new BehaviorSubject('');
    this.salesNavigation$ = new BehaviorSubject('');
    this.momNavigation$ = new BehaviorSubject('');
  }
  getConfig() {
    return this.apiConstant;
  }
  getAllMasterData(param) {
    return this.http.post(this.apiConstant.API_ENDPOINT + 'portal/options/listAll', param);
  }
  createUser(param) {
    return this.http.post(this.apiConstant.API_ENDPOINT + 'login/createUser', param);
  }
  updateUser(param) {
    return this.http.post(this.apiConstant.API_ENDPOINT + 'portal/form/saveEmployeeDetails', param);
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
  getMasterData(param) {
    return this.http.post(this.apiConstant.API_ENDPOINT + 'portal/options/list', param);
  }
  salesFormNavigate(form) {
    this.salesNavigation$.next(form);
  }
  getAllLeads() {
    return this.http.get(this.apiConstant.API_ENDPOINT + 'portal/sales/getAllLeads');
  }
  createOrUpdateLead(param){
    return this.http.post(this.apiConstant.API_ENDPOINT + 'portal/sales/createLead', param);
  }
  getLeadById(leadId) {
    let params = new HttpParams().set("leadId",leadId);
    return this.http.get(this.apiConstant.API_ENDPOINT + 'portal/sales/getLead',{params: params});
  }
  createOrUpdateMom(param){
    return this.http.post(this.apiConstant.API_ENDPOINT + 'portal/sales/createMOM', param);
  }
  getAllMom(leadId) {
    let params = new HttpParams().set("leadId",leadId);
    return this.http.get(this.apiConstant.API_ENDPOINT + 'portal/sales/getAllMOM',{params: params});
  }
  momFormNavigation(form) {
    this.momNavigation$.next(form);
  }
  getMomByMomId(leadId) {
    let params = new HttpParams().set("momId",leadId);
    return this.http.get(this.apiConstant.API_ENDPOINT + 'portal/sales/getMOM',{params: params});
  }
  loadAllMomActionByMomId(momId){
    let params = new HttpParams().set("momId",momId);
    return this.http.get(this.apiConstant.API_ENDPOINT + 'portal/sales/getAllAction',{params: params});
  }
  createOrUpdateMomAction(param){
    return this.http.post(this.apiConstant.API_ENDPOINT + 'portal/sales/createAction', param);
  }
}
