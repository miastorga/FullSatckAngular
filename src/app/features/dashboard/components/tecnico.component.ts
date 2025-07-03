import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-tecnico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main>
      <div class="container mt-5">
        <h2 class="mb-4 text-center">Bienvenido al Dashboard de Técnico, [Nombre del Técnico]!</h2>
        <p class="lead text-center mb-5">Gestiona las reparaciones y el sistema de CellFix.</p>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col">
            <div class="card h-100 text-center">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <img src="../icons/layout-wtf.svg" style="width: 30px;margin: 5px;" alt="">
                <h5 class="card-title">Gestionar Órdenes de Servicio</h5>
                <p class="card-text text-muted">Consulta, modifica y elimina solicitudes de reparación.</p>
                <button class="btn btn-primary mt-auto" 
                        (click)="openModal('gestionarOrdenes')">
                  Administrar Órdenes
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <img src="../icons/magic.svg" style="width: 30px;margin: 5px;" alt="">
                <h5 class="card-title">Actualizar Estado de Reparación</h5>
                <p class="card-text text-muted">Cambia el estado de los equipos en curso.</p>
                <button class="btn btn-primary mt-auto" 
                        (click)="openModal('actualizarEstado')">
                  Actualizar Estado
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <img src="../icons/gear.svg" style="width: 30px;margin: 5px;" alt="">
                <h5 class="card-title">Administrar Catálogos</h5>
                <p class="card-text text-muted">Gestiona usuarios, servicios disponibles y precios.</p>
                <button class="btn btn-primary mt-auto" 
                        (click)="openModal('administrarCatalogos')">
                  Abrir Administración
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Gestionar Órdenes -->
      <div class="modal fade" 
           [class.show]="activeModal === 'gestionarOrdenes'" 
           [style.display]="activeModal === 'gestionarOrdenes' ? 'block' : 'none'"
           (click)="closeModal($event)">
        <div class="modal-dialog modal-xl" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Gestionar Órdenes de Servicio</h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body">
              <p>Aquí se mostraría una tabla completa de todas las órdenes de servicio con opciones para editar/eliminar.</p>
              <div class="mb-3">
                <input type="text" 
                       class="form-control" 
                       placeholder="Buscar por #Orden, Cliente, Equipo..."
                       [(ngModel)]="searchTerm">
              </div>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col"># Orden</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Equipo</th>
                    <th scope="col">Problema</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let orden of ordenes">
                    <td>{{orden.id}}</td>
                    <td>{{orden.cliente}}</td>
                    <td>{{orden.equipo}}</td>
                    <td>{{orden.problema}}</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(orden.estado)">
                        {{orden.estado}}
                      </span>
                    </td>
                    <td>{{orden.costo}}</td>
                    <td>
                      <button class="btn btn-sm btn-info me-1" (click)="verOrden(orden)">Ver</button>
                      <button class="btn btn-sm btn-warning me-1" (click)="editarOrden(orden)">Editar</button>
                      <button class="btn btn-sm btn-danger" (click)="eliminarOrden(orden)">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="btn btn-success mt-3" (click)="crearNuevaOrden()">Crear Nueva Orden (Técnico)</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Actualizar Estado -->
      <div class="modal fade" 
           [class.show]="activeModal === 'actualizarEstado'" 
           [style.display]="activeModal === 'actualizarEstado' ? 'block' : 'none'"
           (click)="closeModal($event)">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Actualizar Estado de Reparación</h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body">
              <form (ngSubmit)="actualizarEstado()" #estadoForm="ngForm">
                <div class="mb-3">
                  <label for="selectOrden" class="form-label">Seleccionar Orden</label>
                  <select class="form-select" 
                          [(ngModel)]="selectedOrden" 
                          name="selectedOrden">
                    <option value="">Selecciona una orden...</option>
                    <option *ngFor="let orden of ordenes" [value]="orden.id">
                      {{orden.id}}: {{orden.equipo}} - {{orden.problema}}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="nuevoEstado" class="form-label">Nuevo Estado</label>
                  <select class="form-select" 
                          [(ngModel)]="nuevoEstado" 
                          name="nuevoEstado">
                    <option value="">Selecciona el nuevo estado...</option>
                    <option value="En Diagnóstico">En Diagnóstico</option>
                    <option value="En Reparación">En Reparación</option>
                    <option value="Listo para Retiro">Listo para Retiro</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="comentariosTecnico" class="form-label">Comentarios Adicionales (Opcional)</label>
                  <textarea class="form-control" 
                            [(ngModel)]="comentariosTecnico" 
                            name="comentariosTecnico" 
                            rows="3"></textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                  <button type="submit" class="btn btn-primary">Actualizar Estado</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Administrar Catálogos -->
      <div class="modal fade" 
           [class.show]="activeModal === 'administrarCatalogos'" 
           [style.display]="activeModal === 'administrarCatalogos' ? 'block' : 'none'"
           (click)="closeModal($event)">
        <div class="modal-dialog modal-lg" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Administrar Catálogos del Sistema</h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body">
              <p>Selecciona una opción para gestionar:</p>
              <div class="list-group">
                <button class="list-group-item list-group-item-action" 
                        (click)="openModal('gestionUsuarios')">
                  Gestión de Usuarios
                </button>
                <button class="list-group-item list-group-item-action" 
                        (click)="openModal('gestionServicios')">
                  Gestión de Servicios
                </button>
                <button class="list-group-item list-group-item-action" 
                        (click)="openModal('gestionMontos')">
                  Gestión de Montos/Precios
                </button>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Gestión Usuarios -->
      <div class="modal fade" 
           [class.show]="activeModal === 'gestionUsuarios'" 
           [style.display]="activeModal === 'gestionUsuarios' ? 'block' : 'none'"
           (click)="closeModal($event)">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Gestión de Usuarios</h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body">
              <p>Aquí puedes crear, editar o eliminar usuarios (clientes y técnicos).</p>
              <button class="btn btn-primary mb-3" (click)="crearNuevoUsuario()">Crear Nuevo Usuario</button>
              <ul class="list-group">
                <li *ngFor="let usuario of usuarios" 
                    class="list-group-item d-flex justify-content-between align-items-center">
                  {{usuario.nombre}} ({{usuario.tipo}})
                  <span>
                    <button class="btn btn-sm btn-warning me-1" (click)="editarUsuario(usuario)">Editar</button>
                    <button class="btn btn-sm btn-danger" (click)="eliminarUsuario(usuario)">Eliminar</button>
                  </span>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Gestión Servicios -->
      <div class="modal fade" 
           [class.show]="activeModal === 'gestionServicios'" 
           [style.display]="activeModal === 'gestionServicios' ? 'block' : 'none'"
           (click)="closeModal($event)">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Gestión de Servicios</h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body">
              <p>Administra los tipos de servicio de reparación ofrecidos.</p>
              <button class="btn btn-primary mb-3" (click)="agregarNuevoServicio()">Agregar Nuevo Servicio</button>
              <ul class="list-group">
                <li *ngFor="let servicio of servicios" 
                    class="list-group-item d-flex justify-content-between align-items-center">
                  {{servicio.nombre}}
                  <span>
                    <button class="btn btn-sm btn-warning me-1" (click)="editarServicio(servicio)">Editar</button>
                    <button class="btn btn-sm btn-danger" (click)="eliminarServicio(servicio)">Eliminar</button>
                  </span>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Gestión Montos -->
      <div class="modal fade" 
           [class.show]="activeModal === 'gestionMontos'" 
           [style.display]="activeModal === 'gestionMontos' ? 'block' : 'none'"
           (click)="closeModal($event)">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Gestión de Montos y Precios</h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body">
              <p>Establece y ajusta los precios de los servicios y componentes.</p>
              <button class="btn btn-primary mb-3" (click)="agregarNuevoMonto()">Agregar Nuevo Monto</button>
              <ul class="list-group">
                <li *ngFor="let monto of montos" 
                    class="list-group-item d-flex justify-content-between align-items-center">
                  {{monto.descripcion}}: {{monto.precio}}
                  <span>
                    <button class="btn btn-sm btn-warning me-1" (click)="editarMonto(monto)">Editar</button>
                    <button class="btn btn-sm btn-danger" (click)="eliminarMonto(monto)">Eliminar</button>
                  </span>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .modal.show {
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .modal-backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }
  `]
})
export class DashboardTecnicoComponent {
  activeModal: string | null = null;
  searchTerm: string = '';
  selectedOrden: string = '';
  nuevoEstado: string = '';
  comentariosTecnico: string = '';

  // Datos de ejemplo
  ordenes = [
    {
      id: 'ORD-001',
      cliente: 'Juan Pérez',
      equipo: 'iPhone 12',
      problema: 'Pantalla rota',
      estado: 'En Diagnóstico',
      costo: '$85.000'
    },
    {
      id: 'ORD-002',
      cliente: 'Maria López',
      equipo: 'Samsung S20',
      problema: 'Problema de batería',
      estado: 'En Reparación',
      costo: '$50.000'
    },
    {
      id: 'ORD-003',
      cliente: 'Carlos Ruiz',
      equipo: 'Xiaomi Redmi',
      problema: 'No enciende',
      estado: 'Listo para Retiro',
      costo: '$60.000'
    }
  ];

  usuarios = [
    { nombre: 'Juan Pérez', tipo: 'Cliente' },
    { nombre: 'Dr. Tech', tipo: 'Técnico' }
  ];

  servicios = [
    { nombre: 'Cambio de Pantalla' },
    { nombre: 'Reemplazo de Batería' }
  ];

  montos = [
    { descripcion: 'Pantalla iPhone 12', precio: '$85.000 CLP' },
    { descripcion: 'Batería Samsung S20', precio: '$50.000 CLP' }
  ];

  openModal(modalName: string) {
    this.activeModal = modalName;
    document.body.classList.add('modal-open');
  }

  closeModal(event?: Event) {
    // Solo cerrar si se hace click en el backdrop (fuera del modal-content)
    if (event && !(event.target as HTMLElement).classList.contains('modal')) {
      return;
    }
    this.activeModal = null;
    document.body.classList.remove('modal-open');
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'En Diagnóstico':
        return 'bg-warning text-dark';
      case 'En Reparación':
        return 'bg-info text-dark';
      case 'Listo para Retiro':
        return 'bg-success';
      case 'Entregado':
        return 'bg-primary';
      case 'Cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  // Métodos para gestión de órdenes
  verOrden(orden: any) {
    console.log('Ver orden:', orden);
  }

  editarOrden(orden: any) {
    console.log('Editar orden:', orden);
  }

  eliminarOrden(orden: any) {
    console.log('Eliminar orden:', orden);
  }

  crearNuevaOrden() {
    console.log('Crear nueva orden');
  }

  actualizarEstado() {
    console.log('Actualizar estado:', {
      orden: this.selectedOrden,
      estado: this.nuevoEstado,
      comentarios: this.comentariosTecnico
    });
    this.closeModal();
  }

  // Métodos para gestión de usuarios
  crearNuevoUsuario() {
    console.log('Crear nuevo usuario');
  }

  editarUsuario(usuario: any) {
    console.log('Editar usuario:', usuario);
  }

  eliminarUsuario(usuario: any) {
    console.log('Eliminar usuario:', usuario);
  }

  // Métodos para gestión de servicios
  agregarNuevoServicio() {
    console.log('Agregar nuevo servicio');
  }

  editarServicio(servicio: any) {
    console.log('Editar servicio:', servicio);
  }

  eliminarServicio(servicio: any) {
    console.log('Eliminar servicio:', servicio);
  }

  // Métodos para gestión de montos
  agregarNuevoMonto() {
    console.log('Agregar nuevo monto');
  }

  editarMonto(monto: any) {
    console.log('Editar monto:', monto);
  }

  eliminarMonto(monto: any) {
    console.log('Eliminar monto:', monto);
  }
}