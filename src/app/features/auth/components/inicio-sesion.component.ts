import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * @description
 * Componente encargado de el inicio de sesion de usuario
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 form-signin">
          <form class="text-center" [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
            <h1 class="h3 mb-3 fw-normal">Iniciar Sesión</h1>
            
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                [class.is-invalid]="isFieldInvalid('email')"
                [class.is-valid]="isFieldValid('email')"
                id="floatingEmail"
                formControlName="email"
                placeholder="correo@ejemplo.com">
              <label for="floatingEmail">Correo Electrónico</label>
              @if(isFieldInvalid('email')){
                <div class="invalid-feedback">
                  {{ getFieldError('email') }}
                </div>
              }
            </div>

            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                [class.is-invalid]="isFieldInvalid('password')"
                [class.is-valid]="isFieldValid('password')"
                id="floatingPassword"
                formControlName="password"
                placeholder="Contraseña">
              <label for="floatingPassword">Contraseña</label>
              @if(isFieldInvalid('password')){
                <div class="invalid-feedback">
                  {{ getFieldError('password') }}
                </div>
              }
            </div>

            <button
              class="w-100 btn btn-lg btn-primary"
              type="submit"
              [disabled]="loginForm.invalid">
              Iniciar Sesión
            </button>
            
            <p class="mt-3 mb-3">
              <a routerLink="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
            </p>
            
            <p class="mt-5 mb-3 text-muted">© 2025</p>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Datos a enviar:', this.loginForm.value);
      alert('¡Formulario validado correctamente! Enviando datos...');
      // Aquí harías la llamada al servicio de autenticación
    } else {
      this.markFormGroupTouched();
      alert('Por favor, corrige los errores en el formulario.');
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.valid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return fieldName === 'email'
          ? 'El correo electrónico es requerido.'
          : 'La contraseña es requerida.';
      }
      if (field.errors['email']) {
        return 'Por favor, ingrese un correo electrónico válido.';
      }
      if (field.errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres.';
      }
    }
    return '';
  }
}