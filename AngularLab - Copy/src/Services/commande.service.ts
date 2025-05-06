import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from 'src/Modeles/Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000/commandes';

  constructor(private http: HttpClient) { }

  // Obtenir toutes les commandes
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);
  }

  // Obtenir une commande par ID
  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle commande
  ajouterCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(this.apiUrl, commande);
  }

  // Modifier une commande existante
  modifierCommande(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/${commande.idcmd}`, commande);
  }

  // Supprimer une commande
  supprimerCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
