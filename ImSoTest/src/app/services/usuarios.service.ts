import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService{
    endpoint = 'usuarios';

    constructor(
        private http : HttpService
    ){}

    RegistrarUsuario(usuario: any): Observable<any>{
        return this.http.post(`${this.endpoint}/RegistrarUsuario`,usuario);
    }

    ListaUsuarios(): Observable<any>{
        return this.http.post(`${this.endpoint}/ListaUsuarios`,{});
    }

    ObtenerDatosUsuario(usuario: any): Observable<any>{
        return this.http.post(`${this.endpoint}/ObtenerDatosUsuario`,usuario);
    }

    ActualizarUsuario(usuario: any): Observable<any>{
        return this.http.post(`${this.endpoint}/ActualizarUsuario`,usuario);
    }

    EliminarUsuario(usuario: any): Observable<any>{
        return this.http.post(`${this.endpoint}/EliminarUsuario`,usuario);
    }
}