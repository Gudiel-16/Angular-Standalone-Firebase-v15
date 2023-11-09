import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from 'src/app/services/players.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Player } from 'src/app/commons/interfaces/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  players$!: Observable<Player[]>;
  _playerService = inject(PlayersService);
  _router = inject(Router);
  searcher = new FormControl('');

  ngOnInit(): void {
    this.players$ = this._playerService.getPlayers();
    // debounceTime para que no haga peticion en cada teclado, si no que espera un poco
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {

      if (search) {
        console.log(search);
        this.players$ = this._playerService.getPlayers(search);
      } else {
        this.players$ = this._playerService.getPlayers();
      }

    });
  }

  editPlayer(player: Player) {
    // pasamos a la ruta y enviamos el objeto a editar
    this._router.navigateByUrl('users/edit', { state: { player } });
  }
  deletePlayer(player: Player) {
    if (confirm(`Seguro de borrar a ${player.name}`)) {
      this._playerService.deletePlayer(player.id);
    }
  }


}
