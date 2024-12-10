import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {
  @Input() availableTypes: string[] = [];  // Tipos disponibles recibidos del componente padre

  @Output() typeSelected = new EventEmitter<string>();  // Emitir tipo seleccionado
  @Output() letterSelected = new EventEmitter<string>();  // Emitir letra seleccionada
  @Output() searchQueryChanged = new EventEmitter<string>();  // Emitir búsqueda manual

  selectedType: string = '';  // Tipo seleccionado
  selectedLetter: string = '';  // Letra seleccionada
filteredPokemons: any;

  // Emite el tipo seleccionado al componente padre
  onTypeChange(): void {
    this.typeSelected.emit(this.selectedType);  
  }

  // Emite la letra seleccionada al componente padre
  onLetterChange(letter: string): void {
    this.selectedLetter = letter;
    this.letterSelected.emit(this.selectedLetter);
  }

  // Emite la consulta de búsqueda al componente padre
  onSearchQueryChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    const query = inputElement?.value || '';  // Valor de búsqueda
    this.searchQueryChanged.emit(query);
  }
}
