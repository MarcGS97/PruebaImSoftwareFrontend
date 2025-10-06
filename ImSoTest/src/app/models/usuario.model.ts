import { Persona } from "./persona.model";

export interface Usuario extends Persona{
    idUsuario : number;
    idPersona : number;
    correo : string;
    telefono : string;
}