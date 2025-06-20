import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number = 50, offset: number = 0): Observable<any> {
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
            const pokemons = pokemonDetails.map((detail: any) => ({
              id: detail.id,
              name: detail.name,
              image: detail.sprites.front_default
            }));
            return {
              total: response.count,
              pokemons: pokemons
            };
          })
        );
      })
    );
  }

  getPokemonDetails(idOrName: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${idOrName}/`).pipe(
      switchMap((pokemonResponse: any) => {
        const pokemonId = pokemonResponse.id;
        const genderRequest$ = this.http.get<any>(`${this.apiUrl}/gender/${pokemonId}/`).pipe(
          map(genderResp => genderResp.name),
          catchError(error => {
            console.warn(`Gênero não encontrado: `, error);
            return of('unknown');
          })
        );
        return forkJoin({ pokemonData: of(pokemonResponse), genderName: genderRequest$ }).pipe(
          map(results => {
            const abilities = results.pokemonData.abilities.map((a: any) => a.ability.name);
            return {
              id: results.pokemonData.id,
              name: results.pokemonData.name,
              abilities: abilities,
              gender: results.genderName,
              base_experience: results.pokemonData.base_experience,
              height: results.pokemonData.height,
              weight: results.pokemonData.weight,
              image: results.pokemonData.sprites.front_default,
              stats: results.pokemonData.stats,
              types: results.pokemonData.types
            };
          })
        );
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }
  
}
