import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { take, retry, tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


// api base URL
const baseUrl = environment.base_api_url;
console.log('baseUrl ===== ' + baseUrl);

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Response-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*.*',
        'Access-Control-Allow-Methods': 'GET, POST,PUT,DELETE',
        'Access-Control-Allow-Headers': '*'
    })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * combine the new headers with old ones
     * @param newHeaders
     */
    combineHeaders(newHeaders: HttpHeaders): void {
      var httpHeaders = httpOptions.headers;
      for (let key of newHeaders.keys()) {
          if (!httpHeaders.has(key)&&newHeaders.get(key)!='need-delete') {
              httpHeaders = httpHeaders.append(key, newHeaders.get(key));
          } else {
              if(newHeaders.get(key)=='need-delete'){
                  httpHeaders = httpHeaders.delete(key);
              }else{
                  httpHeaders = httpHeaders.set(key, newHeaders.get(key));
              }
          }
      }
      httpOptions.headers = httpHeaders;
  }


    /**
   *  GET请求处理（一般用于获取数据）
   * @param url 后台接口api 例如：/api/test/6
   */
  public get(url: string): Observable<any> {
    return this.http.get(`${baseUrl}${url}`, httpOptions).pipe(
      //map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   * POST请求处理（一般用于保存数据）
   * @param url 后台接口api
   * @param data 参数
   */
  public post(url: string, data = {}): Observable<any> {
    return this.http.post(`${baseUrl}${url}`, data, httpOptions).pipe(
      //map(this.extractData),
      catchError(this.handleError)
    );
  }
  /**
   * PUT请求处理（一般用于更新数据）
   * @param url 后台接口api 例如：/api/test/6
   * @param data 参数
   */
  public put(url: string, data = {}): Observable<any> {
    return this.http.put(url, data, httpOptions).pipe(
     // map(this.extractData),
      catchError(this.handleError)
    );
  }
  /**
   * DELETE请求处理（一般用于删除数据）
   * @param url 后台接口api 例如：/api/test/6
   */
  public delete(url: string): Observable<{}> {
    return this.http.delete(url, httpOptions).pipe(
      //map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   *  提取数据
   * @param res 返回结果
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  /**
   * 错误消息类
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

}