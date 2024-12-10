import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { CategoryFilterComponent } from './type-filter/category-filter.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CommonModule, MatCardModule, MatProgressSpinner, MatButton, CategoryFilterComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = []; // Lista de todos los Pokémon
  filteredPokemons: any[] = []; // Lista filtrada de Pokémon
  availableTypes: string[] = []; // Tipos de Pokémon disponibles para filtro
  selectedType: string = ''; // Tipo seleccionado para el filtro
  selectedLetter: string = ''; // Letra inicial seleccionada para el filtro
  searchQuery: string = ''; // Consulta de búsqueda
  loading: boolean = true; // Indicador de carga
  currentPage: number = 1; // Página actual de resultados
  itemsPerPage: number = 20; // Pokémon por página
  paginatedPokemons: any[] = []; // Pokémon para mostrar en la página actual
  totalPages: number = 0; // Total de páginas disponibles

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemonList(); // Cargar la lista de Pokémon
  }

  // Cargar la lista de Pokémon con paginación
  private loadPokemonList(page: number = 1, limit: number = 20): void {
    this.loading = true; // Activar indicador de carga

    this.pokemonService.getAllPokemon().subscribe({
      next: async (data) => {
        try {
          // Obtener detalles de cada Pokémon
          const pokemonRequests = data.results.map((pokemon: any) =>
            firstValueFrom(this.pokemonService.getPokemonDetails(pokemon.name))
          );

          const details = await Promise.all(pokemonRequests); // Esperar por los detalles

          // Mapear detalles y agregar los tipos
          this.pokemons = details.map((pokemon: any) => ({
            ...pokemon,
            typesText: pokemon.types.map((type: { type: { name: string } }) => type.type.name).join(', '),
          }));

          // Obtener tipos únicos disponibles para filtro
          this.availableTypes = Array.from(
            new Set(details.flatMap((pokemon: any) =>
              pokemon.types.map((type: { type: { name: string } }) => type.type.name)
            ))
          );

          this.filteredPokemons = [...this.pokemons]; // Inicializar los Pokémon filtrados

          this.totalPages = Math.ceil(this.filteredPokemons.length / this.itemsPerPage); // Calcular el total de páginas

          this.paginatePokemons(page, limit); // Paginación de los Pokémon filtrados

          this.loading = false; // Desactivar indicador de carga
        } catch (error) {
          console.error('Error cargando los Pokémon', error);
          this.loading = false; // Desactivar indicador de carga en caso de error
        }
      },
      error: (error: any) => {
        console.error('Error obteniendo la lista de Pokémon', error);
        this.loading = false; // Desactivar indicador de carga en caso de error
      },
    });
  }

  // Cambiar de página en la paginación
  onPageChange(page: number): void {
    this.currentPage = page; // Actualizar página actual
    this.loadPokemonList(page, this.itemsPerPage); // Cargar los Pokémon de la nueva página
  }

  // Cambiar el filtro por tipo
  onTypeChange(type: string): void {
    this.selectedType = type; // Actualizar tipo seleccionado
    this.filterPokemons(); // Aplicar filtro
    this.paginatePokemons(this.currentPage, this.itemsPerPage); // Actualizar paginación
  }

  // Cambiar el filtro por letra inicial
  onLetterSelected(letter: string): void {
    this.selectedLetter = letter; // Actualizar letra inicial seleccionada
    this.filterPokemons(); // Aplicar filtro
    this.paginatePokemons(this.currentPage, this.itemsPerPage); // Actualizar paginación
  }

  // Cambiar el filtro por búsqueda
  onSearchQueryChanged(query: string): void {
    this.searchQuery = query.toLowerCase(); // Convertir búsqueda a minúsculas
    this.filterPokemons(); // Aplicar filtro
    this.paginatePokemons(this.currentPage, this.itemsPerPage); // Actualizar paginación
  }

  // Filtrar los Pokémon según los criterios
  private filterPokemons(): void {
    this.filteredPokemons = this.pokemons.filter((pokemon) => {
      const matchesSearch = !this.searchQuery || pokemon.name.toLowerCase().includes(this.searchQuery);
      const matchesLetter = !this.selectedLetter || pokemon.name[0].toUpperCase() === this.selectedLetter;
      const matchesType = !this.selectedType || pokemon.types.some((type: any) => type.type.name === this.selectedType);
      return matchesSearch && matchesLetter && matchesType;
    });
  }

  // Paginación de los Pokémon filtrados
  private paginatePokemons(page: number, limit: number): void {
    const startIndex = (page - 1) * limit; // Índice de inicio
    this.paginatedPokemons = this.filteredPokemons.slice(startIndex, startIndex + limit); // Mostrar los Pokémon correspondientes a la página actual
  }
}
