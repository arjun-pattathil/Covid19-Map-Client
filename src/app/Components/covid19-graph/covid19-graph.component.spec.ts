import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19GraphComponent } from './covid19-graph.component';

describe('Covid19GraphComponent', () => {
  let component: Covid19GraphComponent;
  let fixture: ComponentFixture<Covid19GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Covid19GraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
