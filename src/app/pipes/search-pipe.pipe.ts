import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
  /** 
   * @param items | The Array to load from
   * @param field | The searching Index in the items[]
   * @param value | The matching response from the Array
   **/

  transform(items: any[], field: string, value: string): any[]  { 
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
  }

}
