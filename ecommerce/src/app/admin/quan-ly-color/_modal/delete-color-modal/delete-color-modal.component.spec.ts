import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteColorModalComponent } from './delete-color-modal.component';

describe('DeleteColorModalComponent', () => {
  let component: DeleteColorModalComponent;
  let fixture: ComponentFixture<DeleteColorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteColorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteColorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
