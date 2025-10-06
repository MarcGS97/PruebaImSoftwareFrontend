import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-actualizar-usuario',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
	templateUrl: './actualizar-usuario.component.html',
	styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent {
	usuarioForm!: FormGroup;
	
	constructor(
		private http : UsuariosService, 
		private toastr: ToastrService, 
		public dialogRef: MatDialogRef<ActualizarUsuarioComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	){
		this.usuarioForm = new FormGroup({
			nombre: new FormControl('', [Validators.required, Validators.max(50)]),
			apaterno: new FormControl('', []),
			amaterno: new FormControl('', []),
			correo: new FormControl('', [Validators.required, Validators.email]),
			edad: new FormControl('', [Validators.required, Validators.min(1)]),
			telefono: new FormControl('', [Validators.required]),
		});
	}

	ngOnInit(){
		this.ObtenerDatosUsuario(this.data.usuario);
	}

	ClickBtnActualizarUsuario() {
		if (this.usuarioForm.valid) {
			var json = this.usuarioForm.value;
			json.idPersona = this.data.usuario.idPersona;
			json.idUsuario = this.data.usuario.idUsuario;
			console.log(json); 
			this.ActualizarUsuario(json);
		} else {
			this.usuarioForm.markAllAsTouched();
			console.warn('Datos no validos');
			this.toastr.warning('Datos inválidos!', 'Error!');
		}
  	}

	ObtenerDatosUsuario(data : any) : any{
		this.http.ObtenerDatosUsuario(data).subscribe({
			next: (response) => {
				this.usuarioForm.controls['nombre'].setValue(response.data?.nombre);
				this.usuarioForm.controls['apaterno'].setValue(response.data?.aPaterno);
				this.usuarioForm.controls['amaterno'].setValue(response.data?.aMaterno);
				this.usuarioForm.controls['edad'].setValue(response.data?.edad);
				this.usuarioForm.controls['correo'].setValue(response.data?.correo);
				this.usuarioForm.controls['telefono'].setValue(response.data?.telefono);
			},
			error: (err) => {
				console.error('Error al obtener el usuario:', err);
			}
		});
	}

	ActualizarUsuario(data : any) : any{
		this.http.ActualizarUsuario(data).subscribe({
			next: (response) => {
				this.dialogRef.close(response);
			},
			error: (err) => {
				console.error('Error al actualizar el usuario:', err);
			}
		});
	}

	ClickBtnCancelar(){
		this.dialogRef.close();
	}
}
