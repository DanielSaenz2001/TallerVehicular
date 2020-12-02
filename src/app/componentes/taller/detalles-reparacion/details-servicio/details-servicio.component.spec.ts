import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsServicioComponent } from './details-servicio.component';

describe('DetailsServicioComponent', () => {
  let component: DetailsServicioComponent;
  let fixture: ComponentFixture<DetailsServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
