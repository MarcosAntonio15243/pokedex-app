import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CommonModule, PokemonCardComponent, MatPaginatorModule, MatProgressSpinnerModule, RouterModule],
})
export class HomePage implements OnInit {

  totalPokemons: number = 0;
  pokemons: any[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  loading: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.loading = true;
    const offset = this.currentPage * this.pageSize;
    this.dataService.getPokemons(this.pageSize, offset).subscribe({
      next: (data: any) => {
        this.totalPokemons = data.total;
        this.pokemons = data.pokemons;
      },
      error: (error) => {
        console.error("Erro ao buscar os pokemons: ", error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getPokemons();
  }

}
