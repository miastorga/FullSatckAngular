import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./features/auth/components/inicio-sesion.component";
import { RegisterComponent } from './features/auth/components/registro-sesion.component';
import { DashboardTecnicoComponent } from "./features/dashboard/components/tecnico.component";
import { DashboardClienteComponent } from "./features/dashboard/components/cliente.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoginComponent, RegisterComponent, DashboardTecnicoComponent, DashboardClienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TechRepair';
}
