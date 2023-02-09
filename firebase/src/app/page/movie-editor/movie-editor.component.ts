import { Component, inject, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss']
})
export class MovieEditorComponent implements OnInit {

  afs: AngularFirestore = inject(AngularFirestore);
  
  itemsCollection = this.afs.collection<Movie>('movie');

  movie: Movie = new Movie();
  
  ngOnInit(): void {
    // this.items = this.itemsCollection.valueChanges();
  }

  onCreate(): void {
    this.itemsCollection.add( {...this.movie} );
  }

}
