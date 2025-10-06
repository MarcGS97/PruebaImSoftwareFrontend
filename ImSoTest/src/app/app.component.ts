import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlUsuariosComponent } from './components/modules/control-usuarios/control-usuarios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ControlUsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ImSoftware Test';
}
