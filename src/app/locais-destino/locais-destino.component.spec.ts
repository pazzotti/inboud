import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisDestinoComponent } from './locais-destino.component';

describe('LocaisDestinoComponent', () => {
  let component: LocaisDestinoComponent;
  let fixture: ComponentFixture<LocaisDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaisDestinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaisDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
