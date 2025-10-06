import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistroUsuariosComponent } from '../registro-usuarios/registro-usuarios.component';
import { ToastrService } from 'ngx-toastr';
import { ActualizarUsuarioComponent } from '../actualizar-usuario/actualizar-usuario.component';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';

@Component({
	selector: 'app-control-usuarios',
	standalone: true,
	imports: [CommonModule, MatDialogModule],
	templateUrl: './control-usuarios.component.html',
	styleUrl: './control-usuarios.component.css'
})
export class ControlUsuariosComponent {
	
	usuarios: any[] = [];

	constructor(private http : UsuariosService, private dialog: MatDialog, private toastr: ToastrService){}

	ngOnInit(){
		this.ListaUsuarios();
	}

	ClickBtnAgregarUsuario() : any{
		const dialogRef = this.dialog.open(RegistroUsuariosComponent, {
			data: {},
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if(result?.success){
					this.toastr.success(result?.message, 'Éxito');
					this.ListaUsuarios();
				}else{
					this.toastr.error(result?.message, 'Error');
				}
			}
		});
	}

	ListaUsuarios() : any{
		this.http.ListaUsuarios().subscribe({
			next: (response) => {
				this.usuarios = response.data.map((item : any) => {
					item.fechaHoraRegistro = item.fechaHoraRegistro ? item.fechaHoraRegistro.replace('T', ' ') : '';
					return item;
				});
			},
		error: (err) => {
				console.error('Error al cargar usuarios:', err);
			}
		});
	}

	ClickBtnActualizarUsuario(usuario : any) : any{
		const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
			data: { usuario },
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if(result?.success){
					this.toastr.success(result?.message, 'Éxito');
					this.ListaUsuarios();
				}else{
					this.toastr.error(result?.message, 'Error');
				}
			}
		});
	}

	ClickBtnEliminarUsuario(usuario : any) : any{
		const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
			data: { usuario },
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if(result?.success){
					this.toastr.success(result?.message, 'Éxito');
					this.ListaUsuarios();
				}else{
					this.toastr.error(result?.message, 'Error');
				}
			}
		});
	}
}
