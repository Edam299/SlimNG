import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from 'src/Modeles/Produit';
import { ProduitService } from 'src/Services/produit.service';
import { ProduitFromComponent } from '../produit-from/produit-from.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-produit-liste',
  templateUrl: './produit-liste.component.html',
  styleUrls: ['./produit-liste.component.css']
})
export class ProduitListeComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Produit>();
  displayedColumns: string[] = ['idProduit', 'nomP', 'categorie', 'description', 'prix', 'quantite', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produitService: ProduitService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchProduits();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchProduits() {
    this.produitService.getProduits().subscribe(data => this.dataSource.data = data);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openForm(produit?: Produit) {
    const config = new MatDialogConfig();
    if (produit) config.data = produit;
    config.width = '500px';

    const dialogRef = this.dialog.open(ProduitFromComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchProduits();
    });
  }

   delete(id: number) {
     let dialogRef = this.dialog.open(ConfirmDialogComponent, {
       height: '200px',
       width: '300px',
     });
   
     dialogRef.afterClosed().subscribe((result) => {
       if (result) {
         this.produitService.supprimerProduit(id).subscribe(() => {
           this.produitService.getProduits().subscribe((a) => {
             this.dataSource.data = a;
           });
         });
       }
     });
   }

}
