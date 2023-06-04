import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoEADIComponent } from './contrato-eadi.component';

describe('ContratoEADIComponent', () => {
  let component: ContratoEADIComponent;
  let fixture: ComponentFixture<ContratoEADIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoEADIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoEADIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
