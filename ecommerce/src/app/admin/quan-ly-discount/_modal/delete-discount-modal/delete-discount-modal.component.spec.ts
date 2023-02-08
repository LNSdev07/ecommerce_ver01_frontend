import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiscountModalComponent } from './delete-discount-modal.component';

describe('DeleteDiscountModalComponent', () => {
  let component: DeleteDiscountModalComponent;
  let fixture: ComponentFixture<DeleteDiscountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDiscountModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDiscountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
