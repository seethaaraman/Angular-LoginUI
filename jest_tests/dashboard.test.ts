import { TestBed } from '@angular/core/testing';

import { Dashboard } from '../src/app/pages/dashboard/dashboard';

describe('Dashboard Component (Jest)', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [Dashboard]

    }).compileComponents();

  });

  test('should create dashboard component', () => {

    const fixture = TestBed.createComponent(Dashboard);

    const component = fixture.componentInstance;

    expect(component).toBeTruthy();

  });

});