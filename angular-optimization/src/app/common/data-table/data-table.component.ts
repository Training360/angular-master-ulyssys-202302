import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, OnDestroy {

  @Input() columns: string[] = [];

  @Input() list: Movie[] = [];

  cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  phraseControl: FormControl = new FormControl('');

  phrase: string = '';

  stepper: number = 0;

  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.phraseControl.valueChanges.pipe(
      debounceTime(750),
    ).subscribe(
      newValue => {
        this.phrase = newValue;
        this.cd.markForCheck();
      }
    ));
  }

  transformActive(actvie: boolean): string {
    return actvie ? 'active' : 'inactive';
  }

  fibonacciGenerator(num: number): number {
    num = Math.abs(num) > 33 ? 33 : Math.abs(num);
    if (num <= 1) return 1;

	  return this.fibonacciGenerator(num - 1) + this.fibonacciGenerator(num - 2);
  }

  onSave(): void {
    console.log('Save');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
