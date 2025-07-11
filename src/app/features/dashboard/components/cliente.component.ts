import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Equipo, EquiposService } from '../../../services/equipos.service';

interface OrdenReparacion {
  id: string;
  equipo: string;
  problema: string;
  estado: string;
  fechaEstimada: string;
  estadoBadgeClass: string;
  monto?: number;
}

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4 text-center">Bienvenido al Dashboard de Cliente, {{ nombreCliente }}!</h2>
      <p class="lead text-center mb-5">Aquí puedes gestionar tus reparaciones de forma sencilla.</p>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col">
          <div class="card h-100 text-center">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <svg width="30" height="30" class="mb-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <h5 class="card-title">Crear Nueva Orden de Reparación</h5>
              <p class="card-text text-muted">Inicia una nueva solicitud para tu equipo electrónico.</p>
              <button class="btn btn-primary mt-auto" (click)="abrirModalCrearOrden()">
                Crear Orden
              </button>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100 text-center">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <svg width="30" height="30" class="mb-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <h5 class="card-title">Consultar Estado de Equipos</h5>
              <p class="card-text text-muted">Verifica el progreso y el estado actual de tus reparaciones.</p>
              <button class="btn btn-primary mt-auto" (click)="abrirModalConsultarEstado()">
                Ver Estado
              </button>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100 text-center">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <svg width="30" height="30" class="mb-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"/>
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"/>
              </svg>
              <h5 class="card-title">Simular Pagos</h5>
              <p class="card-text text-muted">Realiza simulaciones de pago para tus servicios pendientes.</p>
              <button class="btn btn-primary mt-auto" (click)="abrirModalSimularPagos()">
                Simular Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear Orden -->
    <div class="modal fade" [class.show]="mostrarModalCrearOrden" [style.display]="mostrarModalCrearOrden ? 'block' : 'none'"
         tabindex="-1" role="dialog" (click)="cerrarModalCrearOrden($event)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear Nueva Orden de Reparación</h5>
            <button type="button" class="btn-close" (click)="cerrarModalCrearOrden()"></button>
          </div>
          <div class="modal-body">
            <form #formCrearOrden="ngForm" (ngSubmit)="crearOrden(formCrearOrden)">
              <div class="mb-3">
                <label for="tipoEquipo" class="form-label">Tipo de Equipo *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  [class.is-invalid]="tipoEquipoField.invalid && tipoEquipoField.touched"
                  [class.is-valid]="tipoEquipoField.valid && tipoEquipoField.touched"
                  id="tipoEquipo" 
                  name="tipoEquipo"
                  #tipoEquipoField="ngModel"
                  [(ngModel)]="nuevaOrden.tipoEquipo"
                  placeholder="Ej: Smartphone, Tablet"
                  required
                  minlength="3">
                @if(tipoEquipoField.invalid && tipoEquipoField.touched){
                  <div class="invalid-feedback">
                    {{ getFieldErrorDirect(tipoEquipoField, 'Tipo de equipo') }}
                  </div>
                }
              </div>
              
              <div class="mb-3">
                <label for="marcaModelo" class="form-label">Marca y Modelo *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  [class.is-invalid]="marcaModeloField.invalid && marcaModeloField.touched"
                  [class.is-valid]="marcaModeloField.valid && marcaModeloField.touched"
                  id="marcaModelo" 
                  name="marcaModelo"
                  #marcaModeloField="ngModel"
                  [(ngModel)]="nuevaOrden.marcaModelo"
                  placeholder="Ej: Samsung Galaxy S23"
                  required
                  minlength="3">
                @if(marcaModeloField.invalid && marcaModeloField.touched){
                  <div class="invalid-feedback">
                    {{ getFieldErrorDirect(marcaModeloField, 'Marca y modelo') }}
                  </div>
                }
              </div>
              
              <div class="mb-3">
                <label for="descripcionProblema" class="form-label">Descripción del Problema *</label>
                <textarea 
                  class="form-control" 
                  [class.is-invalid]="descripcionProblemaField.invalid && descripcionProblemaField.touched"
                  [class.is-valid]="descripcionProblemaField.valid && descripcionProblemaField.touched"
                  id="descripcionProblema" 
                  name="descripcionProblema"
                  #descripcionProblemaField="ngModel"
                  [(ngModel)]="nuevaOrden.descripcionProblema"
                  rows="3"
                  placeholder="Describe brevemente el problema de tu equipo"
                  required
                  minlength="10"></textarea>
                @if(descripcionProblemaField.invalid && descripcionProblemaField.touched){
                  <div class="invalid-feedback">
                    {{ getFieldErrorDirect(descripcionProblemaField, 'Descripción del problema') }}
                  </div>
                }
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="cerrarModalCrearOrden()">Cancelar</button>
                <button type="submit" class="btn btn-primary" [disabled]="!formCrearOrden.valid">Enviar Solicitud</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Consultar Estado -->
    <div class="modal fade" [class.show]="mostrarModalConsultarEstado" [style.display]="mostrarModalConsultarEstado ? 'block' : 'none'"
         tabindex="-1" role="dialog" (click)="cerrarModalConsultarEstado($event)">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Estado de Tus Equipos en Reparación</h5>
            <button type="button" class="btn-close" (click)="cerrarModalConsultarEstado()"></button>
          </div>
          <div class="modal-body">
            <p>Aquí se muestra el estado actual de tus órdenes de reparación.</p>
            <div class="table-responsive">
              <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col"># Orden</th>
                  <th scope="col">Equipo</th>
                  <th scope="col">Problema</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha Estimada</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
                <tbody>
                  @if(loading){
                    <tr>
                      <td colspan="5" class="text-center">Cargando...</td>
                    </tr>
                  }@else{
                    @if(ordenesReparacion.length === 0){
                      <tr>
                        <td colspan="5" class="text-center">No hay órdenes de reparación</td>
                      </tr>
                    }@else{
                      <tr *ngFor="let orden of ordenesReparacion.slice(0,2); trackBy: trackByOrderId">
                        <td>{{ orden.id }}</td>
                        <td>{{ orden.equipo }}</td>
                        <td>{{ orden.problema }}</td>
                        <td><span class="badge" [ngClass]="orden.estadoBadgeClass">{{ orden.estado }}</span></td>
                        <td>{{ orden.fechaEstimada }}</td>
                        <td>
                          <button class="btn btn-sm btn-outline-primary me-1" (click)="abrirModalEditarOrden(orden)" title="Editar">
                            <i class="fas fa-edit"></i>
                            Editar
                          </button>
                          <button class="btn btn-sm btn-outline-danger" (click)="eliminarOrden(orden.id)" title="Eliminar">
                            <i class="fas fa-trash"></i>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
            <p class="text-muted mt-3">Para detalles más específicos, consulta la sección "Mis Órdenes" en la navegación.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cerrarModalConsultarEstado()">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Simular Pagos -->
    <div class="modal fade" [class.show]="mostrarModalSimularPagos" [style.display]="mostrarModalSimularPagos ? 'block' : 'none'"
         tabindex="-1" role="dialog" (click)="cerrarModalSimularPagos($event)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Simulación de Pagos</h5>
            <button type="button" class="btn-close" (click)="cerrarModalSimularPagos()"></button>
          </div>
          <div class="modal-body">
            <p>Selecciona una orden para simular un pago o ingresa un monto.</p>
            <form #formSimularPago="ngForm" (ngSubmit)="simularPago(formSimularPago)">
              <div class="mb-3">
                <label for="ordenPendiente" class="form-label">Seleccionar Orden Pendiente</label>
                <select 
                  class="form-select" 
                  [class.is-invalid]="ordenPendienteField.invalid && ordenPendienteField.touched && !simulacionPago.monto"
                  [class.is-valid]="ordenPendienteField.valid && ordenPendienteField.touched || !!simulacionPago.monto"
                  id="ordenPendiente" 
                  name="ordenPendiente"
                  #ordenPendienteField="ngModel"
                  [(ngModel)]="simulacionPago.ordenSeleccionada">
                  <option value="">Selecciona una orden...</option>
                  <option *ngFor="let orden of ordenesPendientes" [value]="orden.id">
                    {{ orden.id }}: {{ orden.equipo }} - {{ orden.monto?.toLocaleString() }} CLP
                  </option>
                </select>
                @if(ordenPendienteField.invalid && ordenPendienteField.touched && !simulacionPago.monto){
                  <div class="invalid-feedback">
                    Debes seleccionar una orden o ingresar un monto.
                  </div>
                }
              </div>
              
              <div class="mb-3">
                <label for="montoPago" class="form-label">Monto a Simular (opcional)</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    [class.is-invalid]="montoPagoField.invalid && montoPagoField.touched && !simulacionPago.ordenSeleccionada"
                    [class.is-valid]="montoPagoField.valid && montoPagoField.touched || !!simulacionPago.ordenSeleccionada"
                    id="montoPago" 
                    name="montoPago"
                    #montoPagoField="ngModel"
                    [(ngModel)]="simulacionPago.monto"
                    placeholder="Ej: 50000"
                    min="1000">
                  <span class="input-group-text">CLP</span>
                </div>
                @if(montoPagoField.invalid && montoPagoField.touched && !simulacionPago.ordenSeleccionada){
                  <div class="invalid-feedback">
                    {{ getFieldErrorDirect(montoPagoField, 'Monto') }}
                  </div>
                }
                @if(simulacionPago.monto && simulacionPago.monto < 1000){
                  <div class="invalid-feedback d-block">
                    El monto mínimo es $1.000 CLP.
                  </div>
                }
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="cerrarModalSimularPagos()">Cancelar</button>
                <button type="submit" class="btn btn-success" 
                        [disabled]="!isFormValidForPayment()">Simular Pago</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" [class.show]="mostrarModalEditarOrden" [style.display]="mostrarModalEditarOrden ? 'block' : 'none'"
     tabindex="-1" role="dialog" (click)="cerrarModalEditarOrden($event)">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar Orden de Reparación</h5>
        <button type="button" class="btn-close" (click)="cerrarModalEditarOrden()"></button>
      </div>
      <div class="modal-body">
        <form #formEditarOrden="ngForm" (ngSubmit)="actualizarOrden(formEditarOrden)" *ngIf="ordenEditando">
          <div class="mb-3">
            <label for="editEquipo" class="form-label">Equipo *</label>
            <input
              type="text"
              class="form-control"
              [class.is-invalid]="editEquipoField.invalid && editEquipoField.touched"
              [class.is-valid]="editEquipoField.valid && editEquipoField.touched"
              id="editEquipo"
              name="editEquipo"
              #editEquipoField="ngModel"
              [(ngModel)]="ordenEditando.equipo"
              required
              minlength="3">
            @if(editEquipoField.invalid && editEquipoField.touched){
              <div class="invalid-feedback">
                {{ getFieldErrorDirect(editEquipoField, 'Equipo') }}
              </div>
            }
          </div>

          <div class="mb-3">
            <label for="editProblema" class="form-label">Problema *</label>
            <textarea
              class="form-control"
              [class.is-invalid]="editProblemaField.invalid && editProblemaField.touched"
              [class.is-valid]="editProblemaField.valid && editProblemaField.touched"
              id="editProblema"
              name="editProblema"
              #editProblemaField="ngModel"
              [(ngModel)]="ordenEditando.problema"
              rows="3"
              required
              minlength="10"></textarea>
            @if(editProblemaField.invalid && editProblemaField.touched){
              <div class="invalid-feedback">
                {{ getFieldErrorDirect(editProblemaField, 'Problema') }}
              </div>
            }
          </div>

          <div class="mb-3">
            <label for="editEstado" class="form-label">Estado *</label>
            <select
              class="form-select"
              [class.is-invalid]="editEstadoField.invalid && editEstadoField.touched"
              [class.is-valid]="editEstadoField.valid && editEstadoField.touched"
              id="editEstado"
              name="editEstado"
              #editEstadoField="ngModel"
              [(ngModel)]="ordenEditando.estado"
              required>
              <option value="">Selecciona un estado...</option>
              <option value="Recibido">Recibido</option>
              <option value="En Diagnóstico">En Diagnóstico</option>
              <option value="En Reparación">En Reparación</option>
              <option value="Listo para Retiro">Listo para Retiro</option>
              <option value="Entregado">Entregado</option>
            </select>
            @if(editEstadoField.invalid && editEstadoField.touched){
              <div class="invalid-feedback">
                {{ getFieldErrorDirect(editEstadoField, 'Estado') }}
              </div>
            }
          </div>

          <div class="mb-3">
            <label for="editMonto" class="form-label">Monto (CLP)</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input
                type="number"
                class="form-control"
                id="editMonto"
                name="editMonto"
                [(ngModel)]="ordenEditando.monto"
                min="0">
              <span class="input-group-text">CLP</span>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cerrarModalEditarOrden()">Cancelar</button>
            <button type="submit" class="btn btn-primary" [disabled]="!formEditarOrden.valid">Actualizar Orden</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    <!-- Modal Backdrop -->
    <div class="modal-backdrop fade" 
         [class.show]="mostrarModalCrearOrden || mostrarModalConsultarEstado || mostrarModalSimularPagos"
         *ngIf="mostrarModalCrearOrden || mostrarModalConsultarEstado || mostrarModalSimularPagos">
    </div>
  `,
  styles: [`
    .modal {
      z-index: 1050;
    }
    
    .modal-backdrop {
      z-index: 1040;
    }
    
    .modal.show {
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .card:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease-in-out;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .btn {
      transition: all 0.2s ease-in-out;
    }
    
    .btn:hover {
      transform: scale(1.05);
    }
    
    .table-responsive {
      max-height: 400px;
      overflow-y: auto;
    }

    .form-control.is-invalid,
    .form-select.is-invalid {
      border-color: #dc3545;
      padding-right: calc(1.5em + 0.75rem);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m5.8 3.6 .4.4.4-.4M6 7h.01M6 10h.01'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }

    .form-control.is-valid,
    .form-select.is-valid {
      border-color: #198754;
      padding-right: calc(1.5em + 0.75rem);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='m2.3 6.73.8-.77-.76-.77-.76.77-.8.77.76.77.76-.77zm1.54-4.54L5.3 3.66l-.77.76.77.76L6.77 3.66l-1.46-1.47-.77.77z'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }

    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.875em;
      color: #dc3545;
    }
  `]
})
export class DashboardClienteComponent implements OnInit {

  nombreCliente: string = '[Nombre del Cliente]';

  mostrarModalCrearOrden = false;
  mostrarModalConsultarEstado = false;
  mostrarModalSimularPagos = false;
  equiposService = inject(EquiposService);
  loading = false;

  nuevaOrden = {
    tipoEquipo: '',
    marcaModelo: '',
    descripcionProblema: ''
  };

  simulacionPago = {
    ordenSeleccionada: '',
    monto: null as number | null
  };

  ordenesReparacion: Equipo[] = [];

  get ordenesPendientes(): Equipo[] {
    return this.ordenesReparacion.filter(orden =>
      orden.estado === 'Listo para Retiro' ||
      orden.estado === 'En Diagnóstico'
    );
  }

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.loading = true;
    this.equiposService.getEquipos().subscribe({
      next: (equipos) => {
        this.ordenesReparacion = equipos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando equipos:', error);
        this.loading = false;
      }
    });
  }

  crearOrden(form: any): void {
    if (form.valid) {
      const nuevoEquipo: Equipo = {
        id: '', // Se asignará en el servidor
        equipo: `${this.nuevaOrden.tipoEquipo} ${this.nuevaOrden.marcaModelo}`,
        problema: this.nuevaOrden.descripcionProblema,
        estado: 'Recibido',
        fechaEstimada: this.calcularFechaEstimada(),
        estadoBadgeClass: 'bg-secondary',
        monto: Math.floor(Math.random() * 100000) + 30000
      };

      this.equiposService.createEquipo(nuevoEquipo).subscribe({
        next: (equipoCreado) => {
          this.ordenesReparacion.push(equipoCreado);
          alert(`¡Orden creada exitosamente! Número: ${equipoCreado.id}`);
          this.cerrarModalCrearOrden();
        },
        error: (error) => {
          console.error('Error creando orden:', error);
          alert('Error al crear la orden. Intenta nuevamente.');
        }
      });
    } else {
      this.markAllFieldsTouched(form);
      alert('Por favor, corrige los errores en el formulario.');
    }
  }

  getFieldErrorDirect(field: any, fieldName: string): string {
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} es requerido.`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${fieldName} debe tener al menos ${requiredLength} caracteres.`;
      }
      if (field.errors['min']) {
        return `${fieldName} debe ser mayor a ${field.errors['min'].min}.`;
      }
    }
    return '';
  }

  private markAllFieldsTouched(form: any): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.controls[key];
      if (control && control.control) {
        control.control.markAsTouched();
      }
    });
  }

  isFormValidForPayment(): boolean {
    const hasOrder = !!this.simulacionPago.ordenSeleccionada;
    const hasValidAmount = !!(this.simulacionPago.monto && this.simulacionPago.monto >= 1000);
    return hasOrder || hasValidAmount;
  }

  abrirModalCrearOrden(): void {
    this.mostrarModalCrearOrden = true;
  }

  cerrarModalCrearOrden(event?: Event): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.mostrarModalCrearOrden = false;
    this.resetearFormularioOrden();
  }

  abrirModalConsultarEstado(): void {
    this.mostrarModalConsultarEstado = true;
  }

  cerrarModalConsultarEstado(event?: Event): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.mostrarModalConsultarEstado = false;
  }

  mostrarModalEditarOrden = false;
  ordenEditando: Equipo | null = null;

  abrirModalEditarOrden(orden: Equipo): void {
    this.ordenEditando = { ...orden };
    this.mostrarModalEditarOrden = true;
  }

  cerrarModalEditarOrden(event?: Event): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.mostrarModalEditarOrden = false;
    this.ordenEditando = null;
  }

  actualizarOrden(form: any): void {
    if (form.valid && this.ordenEditando) {
      this.equiposService.updateEquipo(this.ordenEditando.id, this.ordenEditando).subscribe({
        next: (equipoActualizado) => {
          const index = this.ordenesReparacion.findIndex(o => o.id === equipoActualizado.id);
          if (index !== -1) {
            this.ordenesReparacion[index] = equipoActualizado;
          }
          alert('Orden actualizada exitosamente!');
          this.cerrarModalEditarOrden();
        },
        error: (error) => {
          console.error('Error actualizando orden:', error);
          alert('Error al actualizar la orden. Intenta nuevamente.');
        }
      });
    } else {
      this.markAllFieldsTouched(form);
      alert('Por favor, corrige los errores en el formulario.');
    }
  }

  eliminarOrden(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      this.equiposService.deleteEquipo(id).subscribe({
        next: () => {
          this.ordenesReparacion = this.ordenesReparacion.filter(o => o.id !== id);
          alert('Orden eliminada exitosamente!');
        },
        error: (error) => {
          console.error('Error eliminando orden:', error);
          alert('Error al eliminar la orden. Intenta nuevamente.');
        }
      });
    }
  }


  abrirModalSimularPagos(): void {
    this.mostrarModalSimularPagos = true;
  }

  cerrarModalSimularPagos(event?: Event): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.mostrarModalSimularPagos = false;
    this.resetearFormularioPago();
  }

  simularPago(form: any): void {
    if (this.isFormValidForPayment()) {
      let mensaje = 'Simulación de pago exitosa!\n';

      if (this.simulacionPago.ordenSeleccionada) {
        const orden = this.ordenesReparacion.find(o => o.id === this.simulacionPago.ordenSeleccionada);
        if (orden) {
          mensaje += `Orden: ${orden.id}\nMonto: ${orden.monto?.toLocaleString()} CLP`;
        }
      } else if (this.simulacionPago.monto) {
        mensaje += `Monto simulado: ${this.simulacionPago.monto.toLocaleString()} CLP`;
      }

      alert(mensaje);
      this.cerrarModalSimularPagos();
    } else {
      this.markAllFieldsTouched(form);
      alert('Por favor, selecciona una orden o ingresa un monto válido.');
    }
  }

  private resetearFormularioOrden(): void {
    this.nuevaOrden = {
      tipoEquipo: '',
      marcaModelo: '',
      descripcionProblema: ''
    };
  }

  private resetearFormularioPago(): void {
    this.simulacionPago = {
      ordenSeleccionada: '',
      monto: null
    };
  }

  trackByOrderId(index: number, orden: Equipo): string {
    return orden.id;
  }

  private calcularFechaEstimada(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + Math.floor(Math.random() * 10) + 5);
    return fecha.toLocaleDateString('es-CL');
  }
}