import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: any;

  constructor(private http: HttpClient) { }

  public loadConfig() {
    return this.http.get('./assets/config/config.json')
      .toPromise().then((data: any) => {
        this.setConfig(data);
      })
      .catch((err: any) => {
        console.log("Error while getting config");
      });
  }

  public setConfig(config) {
    this.config = config;
  }
  public getConfig() {
    return this.config;
  }
}
