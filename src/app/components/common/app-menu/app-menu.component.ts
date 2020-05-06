import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  loginUser: User;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.getLoginUser().subscribe(
      data => {
        this.loginUser = data;
      }
    );
    console.log('login user ===',this.loginUser);
    
  }

}
