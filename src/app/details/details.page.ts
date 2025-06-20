import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {

  pokemonDetails: any = null;
  pokemonId: string | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }


  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    if (this.pokemonId) {
      this.getPokemonDetails(this.pokemonId);
    } else {
      console.error('ID ou nome do Pokémon não fornecido na URL');
    }
  }

  getPokemonDetails(pokemonId: string) {
    this.dataService.getPokemonDetails(pokemonId).subscribe({
      next: (data: any) => {
        this.pokemonDetails = data;
        console.log(this.pokemonDetails);
      },
      error: (error) => {
        console.error("Erro ao buscar detalhes do pokemon: ", error);
      }
    });
  }

}
