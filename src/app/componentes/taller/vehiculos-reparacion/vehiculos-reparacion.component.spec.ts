import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosReparacionComponent } from './vehiculos-reparacion.component';

describe('VehiculosReparacionComponent', () => {
  let component: VehiculosReparacionComponent;
  let fixture: ComponentFixture<VehiculosReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
