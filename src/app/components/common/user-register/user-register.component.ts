import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: User= {
    "loginName": '',
    "password": '',
    "realName": '',
    "email": '',
    "role": '2',
    "activeStatus": 'N'
  };

  errorMsg: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  toLoginPage(){
    this.router.navigate(["/login"]);
  }

  checkRole(value:string){
    console.log(value);
  }

  userRegister(): void {
    console.log(this.user);
    if(this.validateInput(this.user)){
      this.userSvc.userRegister(this.user).subscribe(
        res => {
          console.log('register response===',res);         
          this.toLoginPage();
        },
        err => {
          console.log('err===',err);
          this.errorMsg = err.error;
        }
      )
    }
    
  }

  validateInput(user: User): boolean {
    let validateRst = false;
    if(user.loginName.trim() == ''){
      this.errorMsg = "User Name can't empty!";
    }else if(user.password.trim() == ''){
      this.errorMsg = "User Password can't empty!";
    }else if(user.email.trim() == ''){
      this.errorMsg = "User Email can't empty!";
    }else if(user.realName.trim() == ''){
      this.errorMsg = "User Name can't empty!";
    }else {
      validateRst = true;
    }
    
    return validateRst;
  }

  reset(): void {
    this.errorMsg = '';
    this.user = {
      "loginName": '',
      "password": '',
      "realName": '',
      "email": '',
      "role": '2',
      "activeStatus": 'N'
    };
  }

}
