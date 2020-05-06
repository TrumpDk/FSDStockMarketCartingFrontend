import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AppUiService } from 'src/app/services/app-ui-service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    user: User={
      "loginName": '',
      "password": ''
    };

    constructor(
      private appUiService: AppUiService,
      private userSvc: UserService,
      private router: Router) { }

    ngOnInit() {
    }

    toRegister(){
      this.router.navigate(["/register"]);
    }

    userLogin(): void {
      //console.log(this.user);
      if(this.validateInput(this.user)){
        this.userSvc.userLogin(this.user).subscribe(
          res => {
            console.log('login response===',res);

            if(res){
              //set Login User to global variant
              this.userSvc.setLoginUser(res);

              if(res['role'] == '1'){ //Admin User
                this.router.navigate(["/admin-home"]);
              }else{ // Normal User
                this.router.navigate(["/user-home"]);
              }
              this.reset();
            }else{
              this.appUiService.setMsg(['danger', 'The username or password is wrong!']);
            }   
          },
          err => {
            console.log('err===',err);
            this.appUiService.setMsg(['danger', 'The username or password is wrong!']);
          }
        )
      }
      
    }

    validateInput(user: User): boolean {
      let validateRst = false;
      if(user.loginName.trim() == ''){
        this.appUiService.setMsg(['danger', "User Name can't empty!"]);
      }else if(user.password.trim() == ''){
        this.appUiService.setMsg(['danger', "User Password can't empty!"]);
      }else {
        validateRst = true;
      }
      
      return validateRst;
    }

    reset(): void {
      this.appUiService.setMsg([]);
      this.user = {
        "loginName": '',
        "password": ''
      };
    }

}
