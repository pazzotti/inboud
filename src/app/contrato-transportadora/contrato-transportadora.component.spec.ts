import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoTransportadoraComponent } from './contrato-transportadora.component';

describe('ContratoTransportadoraComponent', () => {
  let component: ContratoTransportadoraComponent;
  let fixture: ComponentFixture<ContratoTransportadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoTransportadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoTransportadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
