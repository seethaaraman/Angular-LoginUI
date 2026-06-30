import { TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';

describe('Dashboard Component', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [Dashboard]

    }).compileComponents();

  });

  it('should create dashboard component', () => {

    const fixture = TestBed.createComponent(Dashboard);

    const component = fixture.componentInstance;

    expect(component).toBeTruthy();

  });

});