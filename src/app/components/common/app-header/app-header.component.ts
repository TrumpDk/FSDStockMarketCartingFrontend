import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  loginUser: User;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.getLoginUser().subscribe(
      data => {
        this.loginUser = data;
      }
    );
  }

  logout(){
    this.userSvc.userLogout();
  }

}
