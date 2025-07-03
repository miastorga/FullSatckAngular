import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modificar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <main>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <div class="card shadow">
              <div class="card-header bg-primary text-white text-center">
                <h2 class="mb-0">Modificar Perfil</h2>
              </div>
              <div class="card-body p-4">
                <form [formGroup]="perfilForm" (ngSubmit)="onSubmit()">
                  <!-- Nombre completo -->
                  <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre completo</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      [class.is-invalid]="isFieldInvalid('nombre')"
                      id="nombre" 
                      placeholder="Ingresa tu nombre completo"
                      formControlName="nombre">
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('nombre')">
                      El nombre es requerido
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      [class.is-invalid]="isFieldInvalid('email')"
                      id="email" 
                      placeholder="correo@ejemplo.com"
                      formControlName="email">
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                      <span *ngIf="perfilForm.get('email')?.errors?.['required']">
                        El correo electrónico es requerido
                      </span>
                      <span *ngIf="perfilForm.get('email')?.errors?.['email']">
                        Ingresa un correo electrónico válido
                      </span>
                    </div>
                  </div>

                  <!-- Teléfono -->
                  <div class="mb-3">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      [class.is-invalid]="isFieldInvalid('telefono')"
                      id="telefono" 
                      placeholder="+56 9 1234 5678"
                      formControlName="telefono">
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('telefono')">
                      El teléfono es requerido
                    </div>
                  </div>

                  <!-- Dirección -->
                  <div class="mb-3">
                    <label for="direccion" class="form-label">Dirección</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="direccion" 
                      placeholder="Calle, número, comuna"
                      formControlName="direccion">
                  </div>

                  <!-- Cambiar contraseña -->
                  <div class="mb-3">
                    <div class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        id="cambiarPassword"
                        (change)="togglePasswordFields($event)">
                      <label class="form-check-label" for="cambiarPassword">
                        Cambiar contraseña
                      </label>
                    </div>
                  </div>

                  <!-- Campos de contraseña (mostrar solo si se marca el checkbox) -->
                  <div *ngIf="mostrarCamposPassword">
                    <div class="mb-3">
                      <label for="passwordActual" class="form-label">Contraseña actual</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        [class.is-invalid]="isFieldInvalid('passwordActual')"
                        id="passwordActual" 
                        placeholder="Contraseña actual"
                        formControlName="passwordActual">
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('passwordActual')">
                        La contraseña actual es requerida
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="passwordNueva" class="form-label">Nueva contraseña</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        [class.is-invalid]="isFieldInvalid('passwordNueva')"
                        id="passwordNueva" 
                        placeholder="Nueva contraseña"
                        formControlName="passwordNueva">
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('passwordNueva')">
                        La nueva contraseña debe tener al menos 6 caracteres
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="confirmarPassword" class="form-label">Confirmar nueva contraseña</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        [class.is-invalid]="isFieldInvalid('confirmarPassword')"
                        id="confirmarPassword" 
                        placeholder="Confirmar nueva contraseña"
                        formControlName="confirmarPassword">
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('confirmarPassword')">
                        Las contraseñas no coinciden
                      </div>
                    </div>
                  </div>

                  <!-- Mensaje de feedback -->
                  <div *ngIf="mensaje" class="alert mt-3" [ngClass]="{
                    'alert-success': tipoMensaje === 'success',
                    'alert-danger': tipoMensaje === 'error'
                  }">
                    {{ mensaje }}
                  </div>

                  <!-- Botones -->
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button 
                      type="button" 
                      class="btn btn-secondary me-md-2"
                      routerLink="/dashboard">
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      class="btn btn-primary"
                      [disabled]="perfilForm.invalid || isLoading">
                      <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                      {{ isLoading ? 'Guardando...' : 'Guardar cambios' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
      background-color: #f8f9fa;
      padding: 2rem 0;
    }
    
    .card {
      border: none;
      border-radius: 0.75rem;
      overflow: hidden;
    }
    
    .card-header {
      border-bottom: none;
      padding: 1.5rem;
    }
    
    .form-label {
      font-weight: 500;
      color: #495057;
      margin-bottom: 0.5rem;
    }
    
    .form-control {
      border-radius: 0.5rem;
      border: 1px solid #ced4da;
      padding: 0.75rem;
      transition: all 0.15s ease-in-out;
    }
    
    .form-control:focus {
      border-color: #0d6efd;
      box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
    }
    
    .btn {
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.15s ease-in-out;
    }
    
    .btn-primary {
      background-color: #0d6efd;
      border-color: #0d6efd;
    }
    
    .btn-primary:hover:not(:disabled) {
      background-color: #0b5ed7;
      border-color: #0a58ca;
      transform: translateY(-1px);
    }
    
    .btn-secondary {
      background-color: #6c757d;
      border-color: #6c757d;
    }
    
    .btn-secondary:hover {
      background-color: #5c636a;
      border-color: #565e64;
    }
    
    .btn:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
    
    .form-check-input:checked {
      background-color: #0d6efd;
      border-color: #0d6efd;
    }
    
    .invalid-feedback {
      display: block;
    }
    
    .alert {
      border-radius: 0.5rem;
      border: none;
    }
    
    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }
    
    @media (max-width: 768px) {
      .d-md-flex {
        flex-direction: column;
      }
      
      .me-md-2 {
        margin-right: 0 !important;
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class ModificarPerfilComponent implements OnInit {
  perfilForm: FormGroup;
  isLoading = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' = 'success';
  mostrarCamposPassword = false;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      direccion: [''],
      passwordActual: [''],
      passwordNueva: [''],
      confirmarPassword: ['']
    });
  }

  ngOnInit(): void {
    // Cargar datos del perfil actual (simular datos del usuario)
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil(): void {
    // Simular carga de datos del usuario actual
    const datosUsuario = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@email.com',
      telefono: '+56 9 1234 5678',
      direccion: 'Av. Principal 123, Santiago'
    };

    this.perfilForm.patchValue(datosUsuario);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.perfilForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordFields(event: any): void {
    this.mostrarCamposPassword = event.target.checked;

    if (this.mostrarCamposPassword) {
      // Añadir validaciones para campos de contraseña
      this.perfilForm.get('passwordActual')?.setValidators([Validators.required]);
      this.perfilForm.get('passwordNueva')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.perfilForm.get('confirmarPassword')?.setValidators([Validators.required]);
    } else {
      // Remover validaciones y limpiar campos
      this.perfilForm.get('passwordActual')?.clearValidators();
      this.perfilForm.get('passwordNueva')?.clearValidators();
      this.perfilForm.get('confirmarPassword')?.clearValidators();

      this.perfilForm.patchValue({
        passwordActual: '',
        passwordNueva: '',
        confirmarPassword: ''
      });
    }

    // Actualizar validaciones
    this.perfilForm.get('passwordActual')?.updateValueAndValidity();
    this.perfilForm.get('passwordNueva')?.updateValueAndValidity();
    this.perfilForm.get('confirmarPassword')?.updateValueAndValidity();
  }

  private validarPasswordsCoinciden(): boolean {
    if (!this.mostrarCamposPassword) return true;

    const passwordNueva = this.perfilForm.get('passwordNueva')?.value;
    const confirmarPassword = this.perfilForm.get('confirmarPassword')?.value;

    return passwordNueva === confirmarPassword;
  }

  async onSubmit(): Promise<void> {
    // Validar que las contraseñas coincidan si se está cambiando
    if (this.mostrarCamposPassword && !this.validarPasswordsCoinciden()) {
      this.perfilForm.get('confirmarPassword')?.setErrors({ 'noCoinciden': true });
      return;
    }

    if (this.perfilForm.valid) {
      this.isLoading = true;
      this.mensaje = '';

      try {
        const datosFormulario = this.perfilForm.value;

        // Preparar datos para enviar (excluir contraseñas si no se están cambiando)
        const datosActualizar = {
          nombre: datosFormulario.nombre,
          email: datosFormulario.email,
          telefono: datosFormulario.telefono,
          direccion: datosFormulario.direccion
        };

        if (this.mostrarCamposPassword) {
          Object.assign(datosActualizar, {
            passwordActual: datosFormulario.passwordActual,
            passwordNueva: datosFormulario.passwordNueva
          });
        }

        // Llamada al servicio para actualizar perfil
        await this.actualizarPerfil(datosActualizar);

        this.tipoMensaje = 'success';
        this.mensaje = 'Perfil actualizado correctamente.';

        // Limpiar campos de contraseña después de actualizar
        if (this.mostrarCamposPassword) {
          this.mostrarCamposPassword = false;
          this.togglePasswordFields({ target: { checked: false } });
        }

      } catch (error) {
        this.tipoMensaje = 'error';
        this.mensaje = 'Error al actualizar el perfil. Inténtalo de nuevo.';
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.perfilForm.controls).forEach(key => {
        this.perfilForm.get(key)?.markAsTouched();
      });
    }
  }

  private async actualizarPerfil(datos: any): Promise<void> {
    // Simular llamada a API - reemplaza esto con tu servicio real
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular éxito o error
        if (datos.nombre && datos.email) {
          resolve();
        } else {
          reject(new Error('Datos inválidos'));
        }
      }, 2000);
    });
  }
}