import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { fibonacciGenerator, FibonacciPipe } from 'src/app/pipe/fibonacci.pipe';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { ConfigService } from 'src/app/service/config.service';
import { movieList } from 'src/mocks/movies';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  const config: ConfigService = new ConfigService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataTableComponent,
        FilterPipe,
        FibonacciPipe,
      ],
      imports: [
        ReactiveFormsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

    component.columns = config.movieTableColumns;
    component.list = movieList;
    fixture.detectChanges();
    component.cd.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSave method should exist', () => {
    expect(component.onSave).toBeTruthy();
    expect(typeof component.onSave).toEqual('function');
  });

  it('header titles should correct', async () => {
    const headers = fixture.debugElement.nativeElement.querySelectorAll(
      'table thead tr th'
    );

    fixture.whenStable().then(() => {
      expect(headers.length).toEqual(7);
      expect(headers[0].innerText).toMatch(/ID/i);
      expect(headers[1].innerText).toMatch(/Title/i);
      expect(headers[2].innerText).toMatch(/Cat/i);
      expect(headers[3].innerText).toMatch(/Year/i);
      expect(headers[4].innerText).toMatch(/Active/i);
    });
  });

  it('table rows should appear', async () => {
    const tableRows = fixture.debugElement.nativeElement.querySelectorAll(
      'table tbody tr'
    );

    fixture.whenStable().then(() => {
      expect(tableRows.length).toEqual(3);
    });
  });

  it('save button should be called', async () => {
    spyOn(component, 'onSave');

    const saveBtn = fixture.debugElement.nativeElement.querySelector(
      'table tbody tr:first-child td button'
    );
    saveBtn.click();
    fixture.detectChanges();
    component.cd.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onSave).toHaveBeenCalled();
    });
  });

  it('save button should be called with correct param', async () => {
    spyOn(component, 'onSave');

    const saveBtn = fixture.debugElement.nativeElement.querySelector(
      'table tbody tr:first-child td button'
    );
    saveBtn.click();
    fixture.detectChanges();
    component.cd.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onSave).toHaveBeenCalledWith(movieList[0]);
    });
  });

  it('fibonacci value should correct', async () => {

    const fibonacciCell = fixture.debugElement.nativeElement.querySelector(
      'table tbody tr:first-child td:nth-child(6)'
    );

    const fibonacciNumber = fibonacciGenerator((movieList[0].year - 2000)).toString();

    fixture.whenStable().then(() => {
      expect(fibonacciCell.innerText.replace(/[^0-9]/g, '')).toEqual(fibonacciNumber);
    });

  });

  it('table filter shuld work', async () => {

    const filterInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
      '.row .col-6 input.form-control'
    );

    filterInput.value = 'firebase';
    filterInput.dispatchEvent(new Event('input'));

    await new Promise( r => setTimeout(r, 1000) );
    component.cd.detectChanges();

    const idCell = fixture.debugElement.nativeElement.querySelector(
      'table tbody tr td'
    );

    expect(idCell.innerText).toEqual('6');

  });

});
