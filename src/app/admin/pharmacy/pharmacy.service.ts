import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class PharmacyService {




  apiUrl:string = environment.apiUrl;

constructor(private http: HttpClient) { }

getPharamacies():Observable<any[]> {
  return this.http.get<any>(`${environment.apiUrl}/Pharmacy/GetAllPharamcies`);

  }

  getPharmacy(pharmacyId:number):Observable<any[]> {
    return this.http.get<any>(`${environment.apiUrl}/Pharmacy/GetPharamcy/${pharmacyId}`);
  
    }

    getPharmacyMedicines(pharmacyId:number):Observable<any[]> {
      return this.http.get<any>(`${environment.apiUrl}/Pharmacy/GetPharmacyMedicines/${pharmacyId}`);
    
      }

  addPharmacy(values: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/Pharmacy/AddPharmacy`,values,httpOptions).pipe(
      tap(() => console.log("pharmacy added"),error =>console.log(error))       
      );
  }

  updatePharmacy(id:number,values:any):Observable<any>
  {
    return this.http.put<any>(`${environment.apiUrl}/Pharmacy/EditPharmacy/${id}`,values,httpOptions).pipe(
      tap(() => console.log("pharmacy updated"),error =>console.log(error))       
      );
  }

  
  updatePharmacyMedicines(id:number,values:any):Observable<any>
  {
    return this.http.put<any>(`${environment.apiUrl}/Pharmacy/UpdatePharmacyMecicines/${id}`,values,httpOptions).pipe(
      tap(() => console.log("pharmacyMedicines updated"),error =>console.log(error))       
      );
  }
  
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
   })
  }
