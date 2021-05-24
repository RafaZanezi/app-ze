import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as responseConfig from '../model/response-config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://api.code-challenge.ze.delivery/public/graphql';
  }

  distributorSearch(lat: number, long: number) {
    return this.http.post(this.url,
      {
        operationName: 'pocSearchMethod',
        query: responseConfig.distributor,
        variables: {
          algorithm: "NEAREST",
          lat: "-23.632919",
          long: "-46.699453",
          now: "2017-08-01T20:00:00.000Z"
        }
      });
  }

  productSearch(distributorId: number, searchParams?: string, categoryId?: number) {
    return this.http.post(this.url,
      {
        operationName: 'poc',
        query: responseConfig.product,
        variables: {
          categoryId: categoryId,
          id: distributorId,
          search: searchParams
        }
      });
  }

  categorySearch() {
    return this.http.post(this.url,
      {
        operationName: 'allCategoriesSearch',
        query: responseConfig.category
      });
  }


}
