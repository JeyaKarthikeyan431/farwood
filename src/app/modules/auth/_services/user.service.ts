import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiConstant:any;

  constructor( private http:HttpClient,private configService:ConfigService) {
    this.apiConstant=this.configService.getConfig();
   }
   getMasterData(param) {
    return this.http.post(this.apiConstant.API_ENDPOINT + 'login/signIn',param);
  }
}
