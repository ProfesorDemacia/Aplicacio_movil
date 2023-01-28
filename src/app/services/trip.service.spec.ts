import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { TripService } from './trip.service';

describe('TripService', () => {
  let service: TripService;

  beforeEach(() => {
    const authStub = () => ({ currentUser: {} });
    const firestoreStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        TripService,
        { provide: Auth, useFactory: authStub },
        { provide: Firestore, useFactory: firestoreStub }
      ]
    });
    service = TestBed.inject(TripService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
