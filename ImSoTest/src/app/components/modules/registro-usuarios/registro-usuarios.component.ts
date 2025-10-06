import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-registro-usuarios',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
	templateUrl: './registro-usuarios.component.html',
	styleUrl: './registro-usuarios.component.css'
})
export class RegistroUsuariosComponent {
	usuarioForm!: FormGroup;

	constructor(
		private http : UsuariosService, 
		private toastr: ToastrService, 
		public dialogRef: MatDialogRef<RegistroUsuariosComponent>,
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

	ClickBtnRegistrarUsuario() {
		if (this.usuarioForm.valid) {
			console.log(this.usuarioForm.value); 
			this.RegistrarUsuario(this.usuarioForm.value);
		} else {
			this.usuarioForm.markAllAsTouched();
			console.warn('Datos no validos');
			this.toastr.warning('Datos inválidos!', 'Error!');
		}
  	}

	RegistrarUsuario(data : any) : any{
		this.http.RegistrarUsuario(data).subscribe({
			next: (response) => {
				this.dialogRef.close(response);
			},
			error: (err) => {
				console.error('Error al registrar el usuario:', err);
			}
		});
	}

	ClickBtnCancelar(){
		this.dialogRef.close();
	}
}
