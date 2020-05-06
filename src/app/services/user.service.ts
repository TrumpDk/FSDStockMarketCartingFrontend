import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppUiService } from './app-ui-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUser:BehaviorSubject<User> = new BehaviorSubject(null);
  private loginUser$ = this.loginUser.asObservable();

  constructor(
      private httpSvc: HttpService,
      private appUiService: AppUiService) { }

  setLoginUser(user: User){
    this.loginUser.next(user);
  }
  
  getLoginUser(): Observable<User>{
    return this.loginUser$;
  }

  /**
   * Add User
   * @param user  
   */
  userRegister(user: User): Observable<Boolean> {
    return this.httpSvc.post('user/register',user).pipe();
  }

  /**
   * User Login
   * @param user 
   */
  userLogin(user: User) : Observable<User> {
    return this.httpSvc.post('user/login',user).pipe();
  }

  /**
   * 
   */
  userLogout():void {
    this.setLoginUser(null);
  }

  /**
   * User Update
   * @param user
   */
  userUpdate(user: User): Observable<Boolean> {
    return this.httpSvc.post('user/update',user).pipe();
  }

  /**
   * Get User by login name
   * @param loginName
   */
  getUser(loginName: string): Observable<User> {
    var url = 'user/' + loginName;
    return this.httpSvc.get(url).pipe();
  }

}
