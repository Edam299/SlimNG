import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFournisseurComponent } from './modal-fournisseur.component';

describe('ModalFournisseurComponent', () => {
  let component: ModalFournisseurComponent;
  let fixture: ComponentFixture<ModalFournisseurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFournisseurComponent]
    });
    fixture = TestBed.createComponent(ModalFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
