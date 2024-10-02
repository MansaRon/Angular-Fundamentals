import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../data/productInterface';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
  /** 
  * @param products | The array of Product objects to filter.
  * @param searchText | The text to search for within the 'title' field of each product.
  * @returns A filtered array of products where the 'title' includes the search text (case-insensitive).
  **/
  transform(products: Product[], searchText: string): Product[] {
    if (!products || !searchText) {
      return products;
    }
    return products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}
