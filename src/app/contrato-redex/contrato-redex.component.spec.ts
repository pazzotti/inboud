import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoRedexComponent } from './contrato-redex.component';

describe('ContratoRedexComponent', () => {
  let component: ContratoRedexComponent;
  let fixture: ComponentFixture<ContratoRedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoRedexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoRedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
