import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
})
export class DetailsPage implements OnInit {
  pokemonDetails: any = null;
  pokemonId: string | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    if (this.pokemonId) {
      this.getPokemonDetails(this.pokemonId);
    } else {
      console.error('ID ou nome do Pokémon não fornecido na URL');
    }
  }

  getPokemonDetails(pokemonId: string) {
    this.loading = true;
    this.dataService.getPokemonDetails(pokemonId).subscribe({
      next: (data: any) => {
        this.pokemonDetails = data;
        console.log(this.pokemonDetails);
      },
      error: (error) => {
        console.error('Erro ao buscar detalhes do pokemon: ', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  voltar(): void {
    this.location.back();
  }
}
