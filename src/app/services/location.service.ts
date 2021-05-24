import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url = 'https://api.tomtom.com/search/2';
  key = 'luDlv17EIsX2BgKRlFADkqAVjIXanC4y';
  
  language = 'pt-BR';
  countrySet = 'BR';
  
  limit = 5;
  lat = 15;
  lon = 47;

  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get(`${this.url}/search/${encodeURIComponent(query)}.json`, {
      params: {
        key: this.key,
        language: this.language,
        countrySet: this.countrySet,
        limit: this.limit,
        lat: this.lat,
        lon: this.lon
      }
    });
  }

}
