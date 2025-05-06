import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-fournisseur',
  templateUrl: './modal-fournisseur.component.html'
})
export class ModalFournisseurComponent {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<ModalFournisseurComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      nom: new FormControl(data?.nom || null),
      prenom: new FormControl(data?.prenom || null),
      email: new FormControl(data?.email || null),
      adresse: new FormControl(data?.adresse || null)
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
