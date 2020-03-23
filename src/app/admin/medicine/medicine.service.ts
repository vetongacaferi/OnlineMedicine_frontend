import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  apiUrl:string = environment.apiUrl;

constructor(private http: HttpClient) { }

getMedicines():Observable<any[]> {
  return this.http.get<any>(`${environment.apiUrl}/Medicine/GetAllMedicines`);

  }

  getMedicine(medicineId:number):Observable<any[]> {
    return this.http.get<any>(`${environment.apiUrl}/Medicine/GetMedicine/${medicineId}`);
  
    }

  addeditMedicine(values: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/Medicine/AddEditMedicine`,values,httpOptions).pipe(
      tap(() => console.log("pharmacy added"),error =>console.log(error))       
      );
  }

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
   })
  }