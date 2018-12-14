import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
// import { ParentService } from './services/parent.service';
import 'rxjs/add/operator/map';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '../../constants/auth.constants';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';

  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }

  // username_check(username: string){
  //  for (var i of ParentService.getParents()){
  //    if (i.user_name == myId) return ev;
  //  }
  // }
}
