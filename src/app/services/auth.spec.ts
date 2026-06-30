import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';

import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthService } from './auth';

describe('AuthService', () => {

  let service: AuthService;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [

        AuthService,

        provideHttpClient(),

        provideHttpClientTesting()

      ]

    });

    service = TestBed.inject(AuthService);

    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {

    httpMock.verify();

  });

  it('should create service', () => {

    expect(service).toBeTruthy();

  });

  it('should call register API', () => {

    const user = {

      firstName: 'John',

      lastName: 'Doe',

      email: 'john@gmail.com',

      password: '123456'

    };

    service.register(user).subscribe();

    const req = httpMock.expectOne(
      'https://localhost:7248/api/Auth/register'
    );

    expect(req.request.method).toBe('POST');

    req.flush(user);

  });

  it('should call login API', () => {

    const login = {

      email: 'john@gmail.com',

      password: '123456'

    };

    service.login(login).subscribe();

    const req = httpMock.expectOne(
      'https://localhost:7248/api/Auth/login'
    );

    expect(req.request.method).toBe('POST');

    req.flush(login);

  });

});
