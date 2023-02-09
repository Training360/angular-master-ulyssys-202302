import { Component, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  afs: AngularFirestore = inject(AngularFirestore);

  items$: Observable<Movie[]> = this.afs.collection<Movie>('movie').valueChanges({idField: 'id'});

}
