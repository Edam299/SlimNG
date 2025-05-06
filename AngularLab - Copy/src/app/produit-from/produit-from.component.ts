import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProduitService } from 'src/Services/produit.service';

@Component({
  selector: 'app-produit-from',
  templateUrl: './produit-from.component.html',
  styleUrls: ['./produit-from.component.css']
})
export class ProduitFromComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProduitFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produitService: ProduitService
  ) {
    this.form = new FormGroup({
      idProduit: new FormControl(data?.idProduit || null),
      nomP: new FormControl(data?.nomP || '', Validators.required),
      categorie: new FormControl(data?.categorie || '', Validators.required),
      description: new FormControl(data?.description || '', Validators.required),
      prix: new FormControl(data?.prix || 0, Validators.required),
      quantite: new FormControl(data?.quantite || 0, Validators.required),
    });
  }
  save() {
    const produit = this.form.value;
    if (produit.idProduit) {
      this.produitService.modifierProduit(produit).subscribe(() => this.dialogRef.close(true));
    } else {
      this.produitService.ajouterProduit(produit).subscribe(() => this.dialogRef.close(true));
    }
  }

  close() {
    this.dialogRef.close();
  }
}