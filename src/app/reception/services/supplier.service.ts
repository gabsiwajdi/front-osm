import { Injectable } from '@angular/core';
import {Supplier} from "../models/supplier";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable,throwError} from "rxjs";
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SupplierService {
 private baseUrl: string ='/api/production/suppliers'

  constructor(private http: HttpClient) { }


  // Add a new supplier
  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.baseUrl}`, supplier).pipe(
      catchError(this.handleError)
    );
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
   return this.http.put<Supplier>(`${this.baseUrl}`, supplier).pipe(
     catchError(this.handleError)
   )

  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur inconnue est survenue.';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}, Message : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
