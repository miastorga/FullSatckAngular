import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTecnicoComponent } from './tecnico.component';
import { By } from '@angular/platform-browser';

describe('DashboardTecnicoComponent', () => {
  let component: DashboardTecnicoComponent;
  let fixture: ComponentFixture<DashboardTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTecnicoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería mostrar la tarjeta "Gestionar Órdenes de Servicio"', () => {
    const cardTitles = fixture.debugElement.queryAll(By.css('.card-title'));
    const titleTexts = cardTitles.map(el => el.nativeElement.textContent.trim());

    expect(titleTexts).toContain('Gestionar Órdenes de Servicio');
  });

  it('debería retornar la clase correcta para el estado "En Reparación"', () => {
    const result = component.getBadgeClass('En Reparación');
    expect(result).toBe('bg-info text-dark');
  });


  it('debería abrir el modal "gestionarOrdenes" al hacer click en el botón correspondiente', () => {
    const button = fixture.debugElement.queryAll(By.css('button'))
      .find(el => el.nativeElement.textContent.includes('Administrar Órdenes'));

    button?.nativeElement.click();
    fixture.detectChanges();

    expect(component.activeModal).toBe('gestionarOrdenes');
  });
});
