import {Injectable} from '@angular/core';

@Injectable()
export class Utils {
  constructor() {}

  static toK(n: number): string { return n >= 1000 ? Math.round(n / 1000) + 'K' : Math.round(n) + ''; }

  precisionRound(number: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  transformNumber(n: number, precision: number, toK?: boolean): string {
    if (toK) {
      return n > 1000 ? this.precisionRound(n / 1000, precision) + 'K' : this.precisionRound(n, precision) + '';
    }
    return this.precisionRound(n, precision) + '';
  }
}
