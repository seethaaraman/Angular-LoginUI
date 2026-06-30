import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { Login } from './login';

describe('Login Component', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [Login],

      providers: [
        provideRouter([]),
        provideHttpClient()
      ]

    }).compileComponents();

  });

  it('should create login component', () => {

    const fixture = TestBed.createComponent(Login);

    const component = fixture.componentInstance;

    expect(component).toBeTruthy();

  });

});