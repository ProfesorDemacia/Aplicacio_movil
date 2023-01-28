import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from '../../services/trip.service';
import { ReturnTripPage } from './return-trip.page';

describe('ReturnTripPage', () => {
  let component: ReturnTripPage;
  let fixture: ComponentFixture<ReturnTripPage>;

  beforeEach(() => {
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const loadingControllerStub = () => ({ create: object => ({}) });
    const authServiceStub = () => ({
      getUserProfile: () => ({ subscribe: f => f({}) })
    });
    const tripServiceStub = () => ({
      insertGoHomeRequest: profile => ({ then: () => ({}) }),
      passengerTripSearch: () => ({ then: () => ({}) }),
      deleteGoHomeRequest: () => ({ then: () => ({}) }),
      searchForCoincidence: arg => ({ then: () => ({}) }),
      chooseDriverToTravel: (driver, profile) => ({ then: () => ({}) }),
      deleteTripRequest: () => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReturnTripPage],
      providers: [
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: LoadingController, useFactory: loadingControllerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: TripService, useFactory: tripServiceStub }
      ]
    });
    spyOn(ReturnTripPage.prototype, 'getUserProfile');
    fixture = TestBed.createComponent(ReturnTripPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`profile has default value`, () => {
    expect(component.profile).toEqual([]);
  });

  it(`driversSearchIsDone has default value`, () => {
    expect(component.driversSearchIsDone).toEqual(false);
  });

  it(`stopDriversSearch has default value`, () => {
    expect(component.stopDriversSearch).toEqual(true);
  });

  it(`tripRequestCreated has default value`, () => {
    expect(component.tripRequestCreated).toEqual(false);
  });

  it(`passengerSearchIsDone has default value`, () => {
    expect(component.passengerSearchIsDone).toEqual(false);
  });

  it(`stopPassengersSearch has default value`, () => {
    expect(component.stopPassengersSearch).toEqual(true);
  });

  it(`goHomeRequestCreated has default value`, () => {
    expect(component.goHomeRequestCreated).toEqual(false);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(ReturnTripPage.prototype.getUserProfile).toHaveBeenCalled();
    });
  });

  describe('getUserProfile', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'getUserProfile').and.callThrough();
      (<jasmine.Spy>component.getUserProfile).and.callThrough();
      component.getUserProfile();
      expect(authServiceStub.getUserProfile).toHaveBeenCalled();
    });
  });


  describe('searchForPassenger', () => {
    it('makes expected calls', () => {
      const tripServiceStub: TripService = fixture.debugElement.injector.get(
        TripService
      );
      spyOn(tripServiceStub, 'passengerTripSearch').and.callThrough();
      component.searchForPassenger();
      expect(tripServiceStub.passengerTripSearch).toHaveBeenCalled();
    });
  });

  describe('deleteGoHomeRequest', () => {
    it('makes expected calls', () => {
      const tripServiceStub: TripService = fixture.debugElement.injector.get(
        TripService
      );
      spyOn(tripServiceStub, 'deleteGoHomeRequest').and.callThrough();
      component.deleteGoHomeRequest();
      expect(tripServiceStub.deleteGoHomeRequest).toHaveBeenCalled();
    });
  });

  describe('initPassengersFlow', () => {
    it('makes expected calls', () => {
      spyOn(component, 'searchingDriversLoading').and.callThrough();
      spyOn(component, 'infiniteSearchForDrivers').and.callThrough();
      component.initPassengersFlow();
      expect(component.searchingDriversLoading).toHaveBeenCalled();
      expect(component.infiniteSearchForDrivers).toHaveBeenCalled();
    });
  });

  describe('searchForDriver', () => {
    it('makes expected calls', () => {
      const tripServiceStub: TripService = fixture.debugElement.injector.get(
        TripService
      );
      spyOn(tripServiceStub, 'searchForCoincidence').and.callThrough();
      component.searchForDriver();
      expect(tripServiceStub.searchForCoincidence).toHaveBeenCalled();
    });
  });


  describe('deleteTripRequest', () => {
    it('makes expected calls', () => {
      const tripServiceStub: TripService = fixture.debugElement.injector.get(
        TripService
      );
      spyOn(tripServiceStub, 'deleteTripRequest').and.callThrough();
      component.deleteTripRequest();
      expect(tripServiceStub.deleteTripRequest).toHaveBeenCalled();
    });
  });
});
