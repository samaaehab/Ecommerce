import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwProductComponent } from './veiw-product.component';

describe('VeiwProductComponent', () => {
  let component: VeiwProductComponent;
  let fixture: ComponentFixture<VeiwProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
