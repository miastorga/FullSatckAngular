import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/**
 * @description
 * Componente encargado de el registro de usuario
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="site-wrapper">
      <main class="content-wrapper">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-9 col-md-7 col-lg-6 form-signup">
              <form class="text-center" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <h1 class="h3 mb-3 fw-normal">Crear una Cuenta</h1>

                <div class="form-floating mb-3">
                  <input 
                    type="email" 
                    class="form-control" 
                    id="emailInput" 
                    formControlName="email"
                    placeholder="correo@ejemplo.com"
                    [class.is-valid]="registerForm.get('email')?.valid && registerForm.get('email')?.touched"
                    [class.is-invalid]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
                  <label for="emailInput">Correo Electrónico</label>
                  <div 
                    class="invalid-feedback" 
                    *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
                    <div *ngIf="registerForm.get('email')?.errors?.['required']">
                      El correo electrónico es requerido.
                    </div>
                    <div *ngIf="registerForm.get('email')?.errors?.['email']">
                      Por favor, ingrese un correo electrónico válido.
                    </div>
                  </div>
                </div>

                <div class="form-floating mb-3">
                  <input 
                    type="password" 
                    class="form-control" 
                    id="passwordInput"
                    formControlName="password"
                    placeholder="Contraseña"
                    [class.is-valid]="registerForm.get('password')?.valid && registerForm.get('password')?.touched"
                    [class.is-invalid]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                  <label for="passwordInput">Contraseña</label>
                  <div 
                    class="invalid-feedback" 
                    *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                    <div *ngIf="registerForm.get('password')?.errors?.['required']">
                      La contraseña es requerida.
                    </div>
                    <div *ngIf="registerForm.get('password')?.errors?.['minlength']">
                      La contraseña debe tener al menos 6 caracteres.
                    </div>
                    <div *ngIf="registerForm.get('password')?.errors?.['pattern']">
                      La contraseña debe contener al menos una mayúscula, una minúscula y un número.
                    </div>
                  </div>
                </div>

                <div class="form-floating mb-3">
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPasswordInput"
                    formControlName="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    [class.is-valid]="registerForm.get('confirmPassword')?.valid && registerForm.get('confirmPassword')?.touched"
                    [class.is-invalid]="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
                  <label for="confirmPasswordInput">Confirmar Contraseña</label>
                  <div 
                    class="invalid-feedback" 
                    *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
                    <div *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">
                      Debe confirmar la contraseña.
                    </div>
                    <div *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">
                      Las contraseñas no coinciden.
                    </div>
                  </div>
                </div>

                <button 
                  class="w-100 btn btn-lg btn-primary" 
                  type="submit"
                  [disabled]="registerForm.invalid">
                  Registrarse
                </button>
                
                <p class="mt-3 mb-3">
                  <a href="./login.html">¿Ya tienes una cuenta? Iniciar Sesión</a>
                </p>
                <p class="mt-5 mb-3 text-muted">© 2025</p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .site-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .content-wrapper {
      flex: 1;
    }
    
    .form-signup {
      max-width: 100%;
    }
    
    .footer {
      margin-top: auto;
    }
    
    .is-valid {
      border-color: #198754;
    }
    
    .is-invalid {
      border-color: #dc3545;
    }
    
    .invalid-feedback {
      display: block;
      font-size: 0.875rem;
      color: #dc3545;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Limpiar error de coincidencia si las contraseñas coinciden
      if (confirmPassword.errors) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };

      console.log('Datos de registro:', formData);
      alert('¡Registro exitoso! Datos listos para ser enviados.');

      // Aquí puedes agregar la lógica para enviar los datos al servidor
      // this.authService.register(formData).subscribe(...);

    } else {
      // Marcar todos los campos como tocados para mostrar los errores
      this.registerForm.markAllAsTouched();
      alert('Por favor, revise los errores en el formulario.');
    }
  }
}