import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoTerminalComponent } from './contrato-terminal.component';

describe('ContratoTerminalComponent', () => {
  let component: ContratoTerminalComponent;
  let fixture: ComponentFixture<ContratoTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoTerminalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
