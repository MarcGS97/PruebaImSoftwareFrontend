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
	form!: FormGroup;
	
	constructor(
		private http : UsuariosService, 
		private toastr: ToastrService, 
		public dialogRef: MatDialogRef<ActualizarUsuarioComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	){
		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required, Validators.max(50)]),
			apaterno: new FormControl('', []),
			amaterno: new FormControl('', []),
			correo: new FormControl('', [Validators.required, Validators.email]),
			edad: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
			telefono: new FormControl('', [Validators.required]),
		});
	}

	ngOnInit(){
		this.ObtenerDatosUsuario(this.data.usuario);
	}

	ClickBtnActualizarUsuario() {
		if (this.form.valid) {
			var json = this.form.value;
			json.idPersona = this.data.usuario.idPersona;
			json.idUsuario = this.data.usuario.idUsuario;
			this.ActualizarUsuario(json);
		} else {
			this.form.markAllAsTouched();
			if(this.form.controls['nombre']?.invalid){
				this.toastr.warning('Nombre no válido!', 'Error!');
				return;
			}
			if(this.form.controls['edad']?.invalid){
				this.toastr.warning('Edad no válida!', 'Error!');
				return;
			}
			if(this.form.controls['correo']?.invalid){
				this.toastr.warning('Correo no válido!', 'Error!');
				return;
			}
			this.toastr.warning('Datos inválidos!', 'Error!');
		}
  	}

	ObtenerDatosUsuario(data : any) : any{
		this.http.ObtenerDatosUsuario(data).subscribe({
			next: (response) => {
				this.form.controls['nombre'].setValue(response.data?.nombre);
				this.form.controls['apaterno'].setValue(response.data?.aPaterno);
				this.form.controls['amaterno'].setValue(response.data?.aMaterno);
				this.form.controls['edad'].setValue(response.data?.edad);
				this.form.controls['correo'].setValue(response.data?.correo);
				this.form.controls['telefono'].setValue(response.data?.telefono);
			},
			error: (err) => {
				this.toastr.error('Error al obtener el usuario!', 'Error!');
			}
		});
	}

	ActualizarUsuario(data : any) : any{
		this.http.ActualizarUsuario(data).subscribe({
			next: (response) => {
				this.dialogRef.close(response);
			},
			error: (err) => {
				this.toastr.error('Error al actualizar el usuario!', 'Error!');
			}
		});
	}

	ClickBtnCancelar(){
		this.dialogRef.close();
	}
}
