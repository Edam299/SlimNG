import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from 'src/Modeles/Fournisseurs';


@Injectable({
  providedIn: 'root'
})
export class FournisseursService {
  private apiUrl = 'http://localhost:3000/fournisseurs'; // URL json-server

  constructor(private http: HttpClient) { }

  // Récupérer tous les fournisseurs
  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl);
  }

  // Récupérer un fournisseur par ID
  getFournisseurById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un fournisseur
  ajouterFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl, fournisseur);
  }

  // Modifier un fournisseur
  modifierFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/${fournisseur.idF}`, fournisseur);
  }

  // Supprimer un fournisseur
  supprimerFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
