import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { Login } from '../src/app/pages/login/login';
import { AuthService } from '../src/app/services/auth';

describe('Login Component (Jest)', () => {

  let component: Login;
  let fixture: ComponentFixture<Login>;

  let authServiceMock: {
    login: jest.Mock;
  };

  let router: Router;

  beforeEach(async () => {

    authServiceMock = {
      login: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [Login],

      providers: [

        provideRouter([]),

        {
          provide: AuthService,
          useValue: authServiceMock
        }

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(Login);

    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    // Prevent alert popup
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    // Prevent console.log
    jest.spyOn(console, 'log').mockImplementation(() => { });

    // Mock localStorage
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { });

    fixture.detectChanges();

  });

  afterEach(() => {

    jest.restoreAllMocks();

  });

  test('should create login component', () => {

    expect(component).toBeTruthy();

  });

  test('should initialize empty user object', () => {

    expect(component.user.email).toBe('');

    expect(component.user.password).toBe('');

  });

  test('should call AuthService.login()', () => {

    component.user = {

      email: 'john@test.com',

      password: '123456'

    };

    authServiceMock.login.mockReturnValue(of({}));

    component.login();

    expect(authServiceMock.login)
      .toHaveBeenCalledWith(component.user);

  });

  test('should save user in localStorage after successful login', () => {

    const response = {

      id: 1,

      firstName: 'John',

      lastName: 'Doe',

      email: 'john@test.com'

    };

    authServiceMock.login.mockReturnValue(of(response));

    component.login();

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(
        'user',
        JSON.stringify(response)
      );

  });

  test('should navigate to dashboard after successful login', () => {

    authServiceMock.login.mockReturnValue(of({}));

    component.login();

    expect(window.alert)
      .toHaveBeenCalledWith('Login Successful');

    expect(router.navigate)
      .toHaveBeenCalledWith(['/dashboard']);

  });

  test('should show error alert if login fails', () => {

    authServiceMock.login.mockReturnValue(

      throwError(() => new Error('Invalid Login'))

    );

    component.login();

    expect(window.alert)
      .toHaveBeenCalledWith('Invalid Email or Password');

    expect(router.navigate)
      .not.toHaveBeenCalled();

  });

});