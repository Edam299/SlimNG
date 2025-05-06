import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ProduitService } from 'src/Services/produit.service';

import { CommandeService } from 'src/Services/commande.service';
import { FournisseursService } from 'src/Services/fournisseurs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  NbProduits = 0;
  NbFournisseurs = 0;
  NbCommandes = 0;

  chartData: ChartDataset[] = [
    {
      label: 'Produits en stock',
      data: [] // Dynamique selon les produits
    }
  ];
  chartLabels: string[] = []; // Labels pour les produits
  chartOptions: ChartOptions = {};

  chartDataPie: ChartDataset[] = [{ data: [] }];
  chartLabelsPie: string[] = ['Produits', 'Commandes', 'Fournisseurs'];

  constructor(private produitService: ProduitService, private fournisseurService: FournisseursService, private commandeService: CommandeService) {
    // Récupération des données produits
    this.produitService.getProduits().subscribe((res) => {
      this.NbProduits = res.length;
      const data = res.map(p => p.quantite); // Exemple : récupérer les stocks des produits
      const labels = res.map(p => p.nomP); // Exemple : nom des produits comme labels
      this.chartData = [{ data, label: 'Stocks des produits' }];
      this.chartLabels = labels;
    });

    // Récupération des données fournisseurs
    this.fournisseurService.getFournisseurs().subscribe((res) => {
      this.NbFournisseurs = res.length;
      this.chartDataPie = [{ data: [this.NbProduits, this.NbCommandes, this.NbFournisseurs] }];
      this.chartLabelsPie = ['Produits', 'Commandes', 'Fournisseurs'];
    });

    // Récupération des données commandes
    this.commandeService.getCommandes().subscribe((res) => {
      this.NbCommandes = res.length;
      // Ajouter d'autres données spécifiques aux commandes pour les graphiques si nécessaire
    });
  }
}
