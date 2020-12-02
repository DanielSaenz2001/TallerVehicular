import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosReparacionFormComponent } from './vehiculos-reparacion-form.component';

describe('VehiculosReparacionFormComponent', () => {
  let component: VehiculosReparacionFormComponent;
  let fixture: ComponentFixture<VehiculosReparacionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosReparacionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosReparacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
