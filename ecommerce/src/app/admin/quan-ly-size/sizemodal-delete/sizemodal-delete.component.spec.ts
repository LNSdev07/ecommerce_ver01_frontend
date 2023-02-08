import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizemodalDeleteComponent } from './sizemodal-delete.component';

describe('SizemodalDeleteComponent', () => {
  let component: SizemodalDeleteComponent;
  let fixture: ComponentFixture<SizemodalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizemodalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizemodalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
