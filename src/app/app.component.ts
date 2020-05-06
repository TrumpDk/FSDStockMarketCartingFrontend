import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './services/http.service';

declare let $: any;
const baseUrl = environment.base_api_url;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
}
