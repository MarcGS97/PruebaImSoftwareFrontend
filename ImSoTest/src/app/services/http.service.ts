import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	private apiUrl = 'https://localhost:7000/api/v1/';

	constructor(private http: HttpClient) {}

	get(endpoint : string): Observable<any[]> {
		return this.http.get<any[]>(`${this.apiUrl}${endpoint}`);
	}

	post(endpoint : string, usuario: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}${endpoint}`, usuario);
	}

	delete(endpoint : string, id: number): Observable<any> {
		return this.http.delete<any>(`${this.apiUrl}${endpoint}/${id}`);
	}

	put(endpoint : string, id: number, usuario: any): Observable<any> {
		return this.http.put<any>(`${this.apiUrl}${endpoint}/${id}`, usuario);
	}
}
