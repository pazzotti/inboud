import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisOrigemComponent } from './locais-origem.component';

describe('LocaisOrigemComponent', () => {
  let component: LocaisOrigemComponent;
  let fixture: ComponentFixture<LocaisOrigemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaisOrigemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaisOrigemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
