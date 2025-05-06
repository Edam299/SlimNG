import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Commande } from 'src/Modeles/Commande';

@Component({
  selector: 'app-modal-commande',
  templateUrl: './modal-commande.component.html',
  styleUrls: ['./modal-commande.component.css']
})
export class ModalCommandeComponent {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalCommandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Commande,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      idcmd: [this.data ? this.data.idcmd : null],
      date: [this.data ? this.data.date : null],
      idF: [this.data ? this.data.idF : null]
    });
  }

  save() {
    // Ensure date is properly formatted
    const formValue = this.form.value;
    if (typeof formValue.date === 'string') {
      formValue.date = new Date(formValue.date);
    }
    
    // Add empty products array to match Commande interface
    formValue.produits = [];
    
    this.dialogRef.close(formValue);
  }

  close() {
    this.dialogRef.close();
  }
}