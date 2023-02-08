import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizemodalComponent } from './sizemodal.component';

describe('SizemodalComponent', () => {
  let component: SizemodalComponent;
  let fixture: ComponentFixture<SizemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
