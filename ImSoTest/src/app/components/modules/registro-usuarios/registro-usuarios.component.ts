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
	form!: FormGroup;

	constructor(
		private http : UsuariosService, 
		private toastr: ToastrService, 
		public dialogRef: MatDialogRef<RegistroUsuariosComponent>,
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

	ClickBtnRegistrarUsuario() {
		if (this.form.valid) {
			this.RegistrarUsuario(this.form.value);
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
