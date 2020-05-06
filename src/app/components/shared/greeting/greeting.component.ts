import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-shared-greeting',
    templateUrl: './greeting.component.html'
})
export class GreetingComponent implements OnInit {

    name: string;

    constructor(
        private userSvc: UserService
    ) { }

    ngOnInit() {
        this.userSvc.getLoginUser().subscribe(
            data => {
                this.name = data.realName;
            }
        )
    }

}
