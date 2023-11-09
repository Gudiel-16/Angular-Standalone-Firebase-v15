import { Injectable } from '@angular/core';
import {
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { collection, deleteDoc, doc, getDocs, addDoc, query, updateDoc, where } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Player } from '../commons/interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private firestore: Firestore) { }

  addPlayer(player: Player) {
    const playersRef = collection(this.firestore, 'players'); // 'players' es la coleccion en firebase
    return addDoc(playersRef, player); // documento que contiene las collections
  }

  getPlayers(filter = '') {
    const playersRef = collection(this.firestore, 'players');
    let q = query(playersRef);
    if (filter) {
      q = query(playersRef, where('name', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Player[]>; // retornamos tipo observable player
  }

  async updatePlayer(player: Player) {
    const playersRef = collection(this.firestore, 'players'); // obtener coleccion
    let q = query(playersRef, where('id', '==', player.id)); // documentos del jugador
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id); // obtenemos doc actual
      await updateDoc(docRef, { ...player });
    });
  }

  async deletePlayer(id: string) {
    const playersRef = collection(this.firestore, 'players');
    let q = query(playersRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id);
      await deleteDoc(docRef);
    });
  }

}
