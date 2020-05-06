import { Component, OnInit, Input } from '@angular/core';
import { AppUiService } from 'src/app/services/app-ui-service';

@Component({
    selector: 'app-msg',
    templateUrl: './msg.component.html'
})
export class MsgComponent implements OnInit {

    @Input() msg;

    constructor(private appUiService: AppUiService) { }

    ngOnInit() {
        this.appUiService.getMsg().subscribe(
            msg => this.msg = msg
        )
    }

}