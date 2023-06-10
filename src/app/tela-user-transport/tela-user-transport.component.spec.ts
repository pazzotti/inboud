import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaUserTransportComponent } from './tela-user-transport.component';

describe('TelaUserTransportComponent', () => {
  let component: TelaUserTransportComponent;
  let fixture: ComponentFixture<TelaUserTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaUserTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaUserTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
