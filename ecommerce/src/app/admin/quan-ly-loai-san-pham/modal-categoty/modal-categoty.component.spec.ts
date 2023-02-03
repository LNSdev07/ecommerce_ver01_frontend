import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategotyComponent } from './modal-categoty.component';

describe('ModalCategotyComponent', () => {
  let component: ModalCategotyComponent;
  let fixture: ComponentFixture<ModalCategotyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategotyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCategotyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
