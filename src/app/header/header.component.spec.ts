import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponentes } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponentes;
  let fixture: ComponentFixture<HeaderComponentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponentes ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
