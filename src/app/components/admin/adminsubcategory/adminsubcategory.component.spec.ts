import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsubcategoryComponent } from './adminsubcategory.component';

describe('AdminsubcategoryComponent', () => {
  let component: AdminsubcategoryComponent;
  let fixture: ComponentFixture<AdminsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
