import { Produit } from "./Produit";

export interface Commande {
  idcmd: number;           // Identifiant de la commande
  date: Date;              // Date de la commande
  idF: number;             // Clé étrangère vers le fournisseur

  produits: Produit[];    // Liste des produits associés à la commande
}