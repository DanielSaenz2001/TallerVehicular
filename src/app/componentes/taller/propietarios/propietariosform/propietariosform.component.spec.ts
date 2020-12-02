import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietariosformComponent } from './propietariosform.component';

describe('PropietariosformComponent', () => {
  let component: PropietariosformComponent;
  let fixture: ComponentFixture<PropietariosformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropietariosformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietariosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
