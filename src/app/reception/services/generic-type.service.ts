import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BaseType} from "../models/baseType";

@Injectable({
  providedIn: 'root'
})
export class GenericTypeService {
  private baseUrl = '/api/production/types';

  constructor(private http :HttpClient) { }

  // Get all records for a specific type category
  getAllTypes(type: string): Observable<BaseType[]> {
    return this.http.get<BaseType[]>(`${this.baseUrl}/${type}`);
  }
}
