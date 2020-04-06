import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {



  apiUrl: string = environment.apiUrl;

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     })
    }

    httpOptionsFile = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
       })
      }
  
  constructor(
    private http: HttpClient,
    private authSerivce: AuthenticationService
      ) { }


  getProfile(): Observable<any> {
    console.log('this.authSerivce.currentUserValue.id:', this.authSerivce.currentUserValue.id);
    return this.http.post<any>(`${environment.apiUrl}/Profile/GetProfile`, { Id : this.authSerivce.currentUserValue.id }, this.httpOptions)
    .pipe(
      tap(() => console.log("user profile get data"),error =>console.log(error))       
      );
  }

  updateProfile(values: any) :Observable<any>
  {
    values.id = this.authSerivce.currentUserValue.id;
    return this.http.put<any>(`${environment.apiUrl}/Profile/UpdateProfile`, values, this.httpOptionsFile).pipe(
      tap(() => console.log("profile updated"),error =>console.log(error))       
      );
  }

}
