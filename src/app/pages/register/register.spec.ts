import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { Register } from './register';

describe('Register Component', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [Register],

      providers: [
        provideRouter([]),
        provideHttpClient()
      ]

    }).compileComponents();

  });

  it('should create register component', () => {

    const fixture = TestBed.createComponent(Register);

    const component = fixture.componentInstance;

    expect(component).toBeTruthy();

  });

});