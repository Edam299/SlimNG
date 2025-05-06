import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Commande } from 'src/Modeles/Commande';
import { CommandeService } from 'src/Services/commande.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCommandeComponent } from '../modal-commande/modal-commande.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Commande>;
  displayedColumns: string[] = ['idcmd', 'date', 'fournisseur', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private commandeService: CommandeService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData() {
    this.commandeService.getCommandes().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open() {
    const dialogRef = this.dialog.open(ModalCommandeComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.commandeService.ajouterCommande(data).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  openEdit(id: number) {
    this.commandeService.getCommandeById(id).subscribe((commande) => {
      const dialogRef = this.dialog.open(ModalCommandeComponent, {
        data: commande,
        height: '400px',
        width: '600px',
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this.commandeService.modifierCommande(data).subscribe(() => {
            this.fetchData();
          });
        }
      });
    });
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (commande) => commande.idcmd !== id
        );
      }
    });
  }
}
