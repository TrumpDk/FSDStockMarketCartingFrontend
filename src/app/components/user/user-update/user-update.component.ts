import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
    user: User={
      "loginName": '',
      "password": '',
      "realName": '',
      "email": ''
    };
    rePwd: string = '';

    errorMsg: string = '';

    constructor(
      private userSvc: UserService,
      private router: Router,
      private routeInfo: ActivatedRoute) { }

    ngOnInit() {
      //this.loginName = this.routeInfo.snapshot.queryParams["login_name"];
      this.userSvc.getLoginUser().subscribe(
        data =>{
          console.log('user update for user===',data);
          
          if(data){
            this.user = data;
          }else{
            this.router.navigate(["/login"]);
          }
        }
      )
    }

    userUpdate(): void {
      this.reset();
      console.log(this.user);
      if(this.validateInput(this.user)){
        this.userSvc.userUpdate(this.user).subscribe(
          res => {
            console.log('update response===',res);         
            //this.router.navigate(["/login"],{ queryParams: { login_name: this.user.loginName } });
            alert('Update Success!')
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
      if(user.password != this.rePwd){
        this.errorMsg = "The two passwords you entered were inconsistent!";
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
    }

}
