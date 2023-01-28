import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleEquipoPage } from './detalle-equipo.page';

describe('DetalleEquipoPage', () => {
  let component: DetalleEquipoPage;
  let fixture: ComponentFixture<DetalleEquipoPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      queryParams: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DetalleEquipoPage],
      providers: [{ provide: ActivatedRoute, useFactory: activatedRouteStub }]
    });
    spyOn(DetalleEquipoPage.prototype, 'obtenerPersonaje');
    fixture = TestBed.createComponent(DetalleEquipoPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`Detalle del Equipo`);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(DetalleEquipoPage.prototype.obtenerPersonaje).toHaveBeenCalled();
    });
  });
});
