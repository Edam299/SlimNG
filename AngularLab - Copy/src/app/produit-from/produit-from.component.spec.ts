import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitFromComponent } from './produit-from.component';

describe('ProduitFromComponent', () => {
  let component: ProduitFromComponent;
  let fixture: ComponentFixture<ProduitFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitFromComponent]
    });
    fixture = TestBed.createComponent(ProduitFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
