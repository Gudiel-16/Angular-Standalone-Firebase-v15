import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';
import { Player } from 'src/app/commons/interfaces/player.interface';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  _playerService = inject(PlayersService); // para no usar consructor e inyectar alli
  _router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  createDeck() {
    // Creando o agregando de forma dinamica
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required),
      })
    );
  }

  addPlayer() {
    this._playerService.addPlayer({
      id: new Date().getTime().toString(), // generando id con fecha
      ...this.form.getRawValue(), // lo del formulario
    } as Player);
    this._router.navigate(['users']);
  }

  get decks() {
    // obtener todos los controles 'decks' del form
    return (this.form.get('decks') as FormArray).controls;
  }
}
