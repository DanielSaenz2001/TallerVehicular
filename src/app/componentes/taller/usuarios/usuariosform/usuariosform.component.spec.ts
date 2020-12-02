import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosformComponent } from './usuariosform.component';

describe('UsuariosformComponent', () => {
  let component: UsuariosformComponent;
  let fixture: ComponentFixture<UsuariosformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
