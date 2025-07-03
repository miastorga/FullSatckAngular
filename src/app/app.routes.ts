import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/inicio-sesion.component';
import { RegisterComponent } from './features/auth/components/registro-sesion.component';
import { DashboardClienteComponent } from './features/dashboard/components/cliente.component';
import { DashboardTecnicoComponent } from './features/dashboard/components/tecnico.component';
import { RecuperarContrasenaComponent } from './features/auth/components/recuperar-contraseña.component';
import { ModificarPerfilComponent } from './features/auth/components/modificar-perfil.component';

export const routes: Routes = [
  {
    path: 'inicio-sesion', component: LoginComponent
  },
  {
    path: 'registro-sesion', component: RegisterComponent
  },
  {
    path: 'dashboard-cliente', component: DashboardClienteComponent
  },
  {
    path: 'dashboard-tecnico', component: DashboardTecnicoComponent
  },
  {
    path: 'recuperar-contraseña', component: RecuperarContrasenaComponent
  },
  {
    path: 'modificar-perfil', component: ModificarPerfilComponent
  },
];
