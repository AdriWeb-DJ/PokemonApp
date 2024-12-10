import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [MatProgressSpinner, NgIf],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;  // Detalles del Pokémon
  formattedTypes: string = '';  // Tipos del Pokémon
  abilities: string = '';  // Habilidades del Pokémon
  locations: string[] = [];  // Lugares donde se puede encontrar el Pokémon

  constructor(
    private route: ActivatedRoute,  // Accede a los parámetros de la ruta
    private pokemonService: PokemonService  // Obtiene los datos del Pokémon a través del servicio
  ) { }

  ngOnInit(): void {
    // Se suscribe a los cambios de la ruta para obtener el ID del Pokémon
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');  // Obtiene el ID del Pokémon desde la URL
      if (id) {
        this.loadPokemonDetails(id);  // Si se encuentra el ID, carga los detalles del Pokémon
      }
    });
  }

  // Función para obtener los detalles del Pokémon usando el servicio
  loadPokemonDetails(id: string): void {
    // Llama al servicio para obtener la información detallada del Pokémon (nombre, tipos, habilidades)
    this.pokemonService.getPokemonDetails(id).subscribe({
      next: (details) => {
        // Al recibir la respuesta, asigna los detalles a las variables correspondientes
        this.pokemon = details;
        this.formattedTypes = details.types.map((type: any) => type.type.name).join(', '); 
        this.abilities = details.abilities.map((ability: any) => ability.ability.name).join(', '); 
      },
      error: (error) => {
        // En caso de error, muestra un mensaje en consola y limpia los detalles del Pokémon
        console.error('Error al cargar los detalles del Pokémon:', error);
        this.pokemon = null;  
      }
    });

    // Llama al servicio para obtener las ubicaciones donde el Pokémon puede ser encontrado
    this.pokemonService.getPokemonLocations(id).subscribe({
      next: (locations) => {
        // Si se obtiene una respuesta, asigna las ubicaciones al array
        this.locations = locations.length ? locations : ['No disponible']; 
      },
      error: (error: any) => {
        // Si ocurre un error al obtener las ubicaciones, muestra un mensaje y asigna un valor por defecto
        console.error('Error al cargar las ubicaciones del Pokémon:', error);
        this.locations = ['No disponible'];  // Establece las ubicaciones como 'No disponible' en caso de error
      }
    });
  }
}