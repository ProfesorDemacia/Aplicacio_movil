import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MindicatorapiService } from 'src/app/services/mindicatorapi.service';
import { FormsModule } from '@angular/forms';
import { ConversorPage } from './conversor.page';

describe('ConversorPage', () => {
  let component: ConversorPage;
  let fixture: ComponentFixture<ConversorPage>;

  beforeEach(() => {
    const navControllerStub = () => ({});
    const mindicatorapiServiceStub = () => ({
      getIndicadores: () => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConversorPage],
      providers: [
        { provide: NavController, useFactory: navControllerStub },
        { provide: MindicatorapiService, useFactory: mindicatorapiServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ConversorPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`getdata has default value`, () => {
    expect(component.getdata).toEqual([]);
  });

  it(`pesoChileno has default value`, () => {
    expect(component.pesoChileno).toEqual(0);
  });

  it(`respuestaCarga has default value`, () => {
    expect(component.respuestaCarga).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'cargarUf').and.callThrough();
      component.ngOnInit();
      expect(component.cargarUf).toHaveBeenCalled();
    });
  });
});
