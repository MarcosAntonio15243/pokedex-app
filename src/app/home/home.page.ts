import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CommonModule, PokemonCardComponent],
})
export class HomePage implements OnInit {

  totalPokemons: number = 0;
  pokemons: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.dataService.getPokemons().subscribe({
      next: (data: any) => {
        this.totalPokemons = data.total,
        this.pokemons = data.pokemons
      },
      error: (error) => {
        console.error("Erro ao buscar os pokemons: ", error);
      }
    })
  }


}
