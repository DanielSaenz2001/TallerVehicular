import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFaseComponent } from './details-fase.component';

describe('DetailsFaseComponent', () => {
  let component: DetailsFaseComponent;
  let fixture: ComponentFixture<DetailsFaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
