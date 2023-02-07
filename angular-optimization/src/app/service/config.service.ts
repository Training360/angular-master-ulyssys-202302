import { Injectable } from '@angular/core';

interface ITableColumn {
  title: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  movieTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Title', key: 'title' },
    { title: 'Cat.', key: 'category' },
    { title: 'Year', key: 'year' },
    { title: 'Active', key: 'active' },
  ];

  constructor() { }
}
