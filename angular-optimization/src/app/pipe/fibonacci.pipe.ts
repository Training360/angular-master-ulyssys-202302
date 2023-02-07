import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

const fibonacciGenerator = (num: number): number => {
  num = Math.abs(num) > 33 ? 33 : Math.abs(num);
  if (num <= 1) return 1;

  return fibonacciGenerator(num - 1) + fibonacciGenerator(num - 2);
}

@Pipe({
  name: 'fibonacci',
})
export class FibonacciPipe implements PipeTransform {

  @memo()
  transform(value: number): number {
    if (typeof value !== 'number') {
      return value;
    }
    return fibonacciGenerator(value);
  }

}
