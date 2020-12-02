import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosformComponent } from './vehiculosform.component';

describe('VehiculosformComponent', () => {
  let component: VehiculosformComponent;
  let fixture: ComponentFixture<VehiculosformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
