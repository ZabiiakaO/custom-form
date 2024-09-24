import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignUpBody } from './sign-up-form/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {
  private url = 'https://httpbin.org/post';

  constructor(private httpClient: HttpClient) {}

  public sendSignUpRequest(body: ISignUpBody): Observable<any> {
    return this.httpClient.post(this.url, body);
  }
 }
