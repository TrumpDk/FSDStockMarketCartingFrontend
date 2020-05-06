import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUiService {
  msg: BehaviorSubject<string[]> = new BehaviorSubject([]);
  msgObservable = this.msg.asObservable();
  
  showHideLoadingContent: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showHideLoadingContent$ = this.showHideLoadingContent.asObservable();

  constructor() { }

  setMsg(msg): void {
    this.msg.next(msg);
  }

  getMsg(): Observable<string[]> {
      return this.msgObservable;
  }

  showLoadingContent(): void {
    this.showHideLoadingContent.next(true);
  }

  hideLoadingContent(): void {
    this.showHideLoadingContent.next(false);
  }

  getShowHideLoadingContent(): Observable<boolean> {
      return this.showHideLoadingContent$;
  }

}
