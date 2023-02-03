import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiKhoanAdminComponent } from './tai-khoan-admin.component';

describe('TaiKhoanAdminComponent', () => {
  let component: TaiKhoanAdminComponent;
  let fixture: ComponentFixture<TaiKhoanAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaiKhoanAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaiKhoanAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
