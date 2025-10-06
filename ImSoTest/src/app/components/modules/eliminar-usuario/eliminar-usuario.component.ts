import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-eliminar-usuario',
standalone: true,
imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
templateUrl: './eliminar-usuario.component.html',
styleUrl: './eliminar-usuario.component.css'
})
export class EliminarUsuarioComponent {
	usuarioForm!: FormGroup;
		
	constructor(
		private http : UsuariosService, 
		private toastr: ToastrService, 
		public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
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

	ClickBtnEliminarUsuario() {
		this.EliminarUsuario(this.data.usuario);
	}

	EliminarUsuario(data : any) : any{
		this.http.EliminarUsuario(data).subscribe({
			next: (response) => {
				this.dialogRef.close(response);
			},
			error: (err) => {
				console.error('Error al eliminar el usuario:', err);
			}
		});
	}

	ClickBtnCancelar(){
		this.dialogRef.close();
	}
}
