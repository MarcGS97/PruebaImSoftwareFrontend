import { RouterOutlet, Routes } from '@angular/router';
import {ControlUsuariosComponent} from './components/modules/control-usuarios/control-usuarios.component'

export const routes: Routes = [
  { path: '', component: RouterOutlet },
  { path: 'usuarios', component: ControlUsuariosComponent }
];