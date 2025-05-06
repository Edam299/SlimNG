import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fournisseur } from 'src/Modeles/Fournisseurs';
import { FournisseursService } from 'src/Services/fournisseurs.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalFournisseurComponent } from '../modal-fournisseur/modal-fournisseur.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
})
export class FournisseurListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Fournisseur>();
  displayedColumns: string[] = ['idF', 'nom', 'prenom', 'email', 'adresse', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fournisseurService: FournisseursService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData(): void {
    this.fournisseurService.getFournisseurs().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open(): void {
    const dialogRef = this.dialog.open(ModalFournisseurComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fournisseurService.ajouterFournisseur(result).subscribe(() => this.fetchData());
      }
    });
  }

  openEdit(id: number): void {
    this.fournisseurService.getFournisseurById(id).subscribe((fournisseur) => {
      const config = new MatDialogConfig();
      config.data = fournisseur;
      config.width = '600px';
      config.height = '400px';
      this.dialog.open(ModalFournisseurComponent, config);
    });
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fournisseurService.supprimerFournisseur(id).subscribe(() => {
          this.fournisseurService.getFournisseurs().subscribe((a) => {
            this.dataSource.data = a;
          });
        });
      }
    });
  }
  
}