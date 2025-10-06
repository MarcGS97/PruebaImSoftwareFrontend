import { RouterOutlet, Routes } from '@angular/router';
import {ControlUsuariosComponent} from './components/modules/control-usuarios/control-usuarios.component'

export const routes: Routes = [
  { path: '', component: ControlUsuariosComponent },
  { path: 'usuarios', component: ControlUsuariosComponent }
];