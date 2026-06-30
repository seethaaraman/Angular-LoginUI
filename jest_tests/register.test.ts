import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { Register } from '../src/app/pages/register/register';
import { AuthService } from '../src/app/services/auth';

describe('Register Component (Jest)', () => {

  let component: Register;
  let fixture: ComponentFixture<Register>;

  let authServiceMock: {
    register: jest.Mock;
  };

  let router: Router;

  beforeEach(async () => {

    authServiceMock = {
      register: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [Register],

      providers: [

        provideRouter([]),

        {
          provide: AuthService,
          useValue: authServiceMock
        }

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(Register);

    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    // Prevent alert popup warnings
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    // Prevent console.log output during tests
    jest.spyOn(console, 'log').mockImplementation(() => { });

    fixture.detectChanges();

  });

  afterEach(() => {

    jest.restoreAllMocks();

  });

  test('should create register component', () => {

    expect(component).toBeTruthy();

  });

  test('should initialize empty user object', () => {

    expect(component.user.firstName).toBe('');

    expect(component.user.lastName).toBe('');

    expect(component.user.email).toBe('');

    expect(component.user.password).toBe('');

  });

  test('should call AuthService.register()', () => {

    component.user = {

      firstName: 'John',

      lastName: 'Doe',

      email: 'john@test.com',

      password: '123456'

    };

    authServiceMock.register.mockReturnValue(of({}));

    component.register();

    expect(authServiceMock.register)
      .toHaveBeenCalledWith(component.user);

  });

  test('should navigate to login after successful registration', () => {

    authServiceMock.register.mockReturnValue(of({}));

    component.register();

    expect(window.alert)
      .toHaveBeenCalledWith('Registration Successful!');

    expect(router.navigate)
      .toHaveBeenCalledWith(['/login']);

  });

  test('should show error alert if registration fails', () => {

    authServiceMock.register.mockReturnValue(

      throwError(() => new Error('Registration Failed'))

    );

    component.register();

    expect(window.alert)
      .toHaveBeenCalledWith('Registration Failed!');

    expect(router.navigate)
      .not.toHaveBeenCalled();

  });

});