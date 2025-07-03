import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardClienteComponent } from './cliente.component';
import { FormsModule } from '@angular/forms';

describe('DashboardClienteComponent', () => {
  let component: DashboardClienteComponent;
  let fixture: ComponentFixture<DashboardClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardClienteComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería abrir y cerrar el modal de crear orden', () => {
    component.abrirModalCrearOrden();
    expect(component.mostrarModalCrearOrden).toBeTrue();

    component.cerrarModalCrearOrden();
    expect(component.mostrarModalCrearOrden).toBeFalse();
  });

  it('debería agregar una nueva orden si el formulario es válido', () => {
    const longitudInicial = component.ordenesReparacion.length;

    component.nuevaOrden = {
      tipoEquipo: 'Tablet',
      marcaModelo: 'iPad Pro',
      descripcionProblema: 'Pantalla rota'
    };

    const formMock = {
      valid: true
    };

    component.crearOrden(formMock);

    expect(component.ordenesReparacion.length).toBe(longitudInicial + 1);
    const ultimaOrden = component.ordenesReparacion[component.ordenesReparacion.length - 1];
    expect(ultimaOrden.equipo).toContain('iPad Pro');
    expect(ultimaOrden.problema).toBe('Pantalla rota');
  });
});
