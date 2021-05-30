import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Address } from 'src/app/model/address.model';
import { LocationService } from 'src/app/services/location.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  address: FormControl;
  addressList: Array<Address>;
  distributorId: number | undefined;
  loading: boolean;

  constructor(
    private locationService: LocationService,
    private searchService: SearchService,
    private router: Router
  ) {
    this.loading = false;
    this.address = new FormControl('');
    this.addressList = new Array<Address>();

    this.address.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(address => this.searchAddress(address));
  }

  searchDistributor(lat: string, long: string) {
    this.loading = true;
    localStorage.setItem('sessionLatitude', lat);
    localStorage.setItem('sessionLongitude', long);

    this.searchService.distributorSearch(lat, long).subscribe((response: any) => {
      this.distributorId = response.data.pocSearch[0].id;
      if (this.distributorId) {
        this.router.navigate([this.distributorId, 'products']);
      }
    }, () => window.alert('Ocorreu um erro ao processar'), () => this.loading = false);
  }

  searchAddress(address: string) {
    if (address) {
      this.locationService.search(address)
        .subscribe((resultSet: any) => this.addressList = resultSet.results,
          () => window.alert('Ocorreu um erro ao processar'));
    } else {
      this.addressList = new Array<Address>();
    }
  }

}

