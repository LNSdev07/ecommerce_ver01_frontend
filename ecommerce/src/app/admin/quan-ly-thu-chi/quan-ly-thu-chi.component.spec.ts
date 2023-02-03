import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyThuChiComponent } from './quan-ly-thu-chi.component';

describe('QuanLyThuChiComponent', () => {
  let component: QuanLyThuChiComponent;
  let fixture: ComponentFixture<QuanLyThuChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLyThuChiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyThuChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
