import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaUserComponent } from './tela-user.component';

describe('TelaUserComponent', () => {
  let component: TelaUserComponent;
  let fixture: ComponentFixture<TelaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
