import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyLoaiSanPhamComponent } from './quan-ly-loai-san-pham.component';

describe('QuanLyLoaiSanPhamComponent', () => {
  let component: QuanLyLoaiSanPhamComponent;
  let fixture: ComponentFixture<QuanLyLoaiSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLyLoaiSanPhamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyLoaiSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
