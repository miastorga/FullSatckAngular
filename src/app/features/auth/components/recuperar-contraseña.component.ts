import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-9 col-md-7 col-lg-5">
            <form [formGroup]="recuperarForm" (ngSubmit)="onSubmit()" class="form-recuperar-contrasena text-center">
              <img class="mb-4" 
                   src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" 
                   alt="Logo"
                   width="72" 
                   height="57">
              <h1 class="h3 mb-3 fw-normal">Recuperar Contraseña</h1>
              <p class="mb-3 text-muted">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
              
              <div class="form-floating mb-3">
                <input 
                  type="email" 
                  class="form-control" 
                  [class.is-invalid]="isFieldInvalid('email')"
                  id="floatingEmail" 
                  placeholder="correo@ejemplo.com" 
                  formControlName="email">
                <label for="floatingEmail">Correo Electrónico</label>
                <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                  <span *ngIf="recuperarForm.get('email')?.errors?.['required']">
                    El correo electrónico es requerido
                  </span>
                  <span *ngIf="recuperarForm.get('email')?.errors?.['email']">
                    Ingresa un correo electrónico válido
                  </span>
                </div>
              </div>
              
              <button 
                class="w-100 btn btn-lg btn-primary" 
                type="submit"
                [disabled]="recuperarForm.invalid || isLoading">
                <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ isLoading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
              </button>
              
              <p class="mt-3 mb-3">
                <!-- <a [routerLink]="['/inicio-sesion']" class="text-decoration-none">
                  Volver al inicio de sesión
                </a> -->
              </p>
              
              <div *ngIf="mensaje" class="alert mt-3" [ngClass]="{
                'alert-success': tipoMensaje === 'success',
                'alert-danger': tipoMensaje === 'error'
              }">
                {{ mensaje }}
              </div>
              
              <p class="mt-5 mb-3 text-muted">© 2025</p>
            </form>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    
    .form-recuperar-contrasena {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }
    
    .form-floating > .form-control {
      height: calc(3.5rem + 2px);
    }
    
    .btn-primary {
      background-color: #0d6efd;
      border-color: #0d6efd;
    }
    
    .btn-primary:hover {
      background-color: #0b5ed7;
      border-color: #0a58ca;
    }
    
    .text-muted {
      color: #6c757d !important;
    }
    
    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class RecuperarContrasenaComponent {
  recuperarForm: FormGroup;
  isLoading = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.recuperarForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.recuperarForm.valid) {
      this.isLoading = true;
      this.mensaje = '';

      try {
        const email = this.recuperarForm.get('email')?.value;

        // Aquí harías la llamada a tu servicio para enviar el email de recuperación
        await this.enviarEmailRecuperacion(email);

        this.tipoMensaje = 'success';
        this.mensaje = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
        this.recuperarForm.reset();

      } catch (error) {
        this.tipoMensaje = 'error';
        this.mensaje = 'Error al enviar el enlace de recuperación. Inténtalo de nuevo.';
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.recuperarForm.controls).forEach(key => {
        this.recuperarForm.get(key)?.markAsTouched();
      });
    }
  }

  private async enviarEmailRecuperacion(email: string): Promise<void> {
    // Simular llamada a API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular éxito o error basado en alguna condición
        if (email) {
          resolve();
        } else {
          reject(new Error('Email inválido'));
        }
      }, 2000);
    });
  }
}