import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieService } from 'src/app/service/movie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PushModule } from '@rx-angular/template/push';

import { PrimeTableComponent } from './prime-table.component';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { movieList } from 'src/mocks/movies';
import { TableModule } from 'primeng/table';

describe('PrimeTableComponent', () => {
  let component: PrimeTableComponent;
  let fixture: ComponentFixture<PrimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeTableComponent ],
      imports: [
        HttpClientTestingModule,
        TableModule, 
        PushModule, 
      ],
      providers: [
        {
          provide: MovieService,
          useValue: {
            getAll(): Observable<Movie[]> {
              return of(movieList);
            }
          }
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should show rows', () => {
    const idCell = fixture.debugElement.nativeElement.querySelector(
      '#movie-table tbody tr td'
    );
    expect(idCell.innerText.trim()).toEqual('5');
  });
});
