import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number = 50, offset: number = 0): Observable<any[]> {
    // Request geral para buscar a lista de pokemons da página
    return this.http.get<any[]>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      switchMap((response: any) => {
        // Busca a url de cada pokemon para buscar os dados de cada um
        const requests = response.results.map((pokemon: any) => {
          return this.http.get<any>(pokemon.url);
        });
        // Realiza um fork para requisições em paralelo aos dados de cada pokemon
        return forkJoin(requests).pipe(
          map((pokemonDetails: any) => {
            // Retorna os dados do pokemon
            return pokemonDetails.map((detail: any) => ({
              id: detail.id,
              name: detail.name,
              image: detail.sprites.front_default
            }));
          })
        )
      })
    );
  }
  
}
