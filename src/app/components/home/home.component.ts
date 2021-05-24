import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  address: FormControl;
  addressList: any; // change type - create model 

  constructor(
    private locationService: LocationService,
    private searchService: SearchService,
  ) {
    this.address = new FormControl('');

    this.address.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(address => this.searchAddress(address));
  }

  ngOnInit(): void {
  }


  searchDistributor(lat: number, long: number) {
    this.searchService.distributorSearch(lat, long).subscribe(res => {
      console.log(res);
    });
  }

  private searchAddress(address: string) {
    if(address) {
      this.locationService.search(address).subscribe((resultSet: any) => {
        console.log(resultSet);
        this.addressList = resultSet.results;
      });
    }
  }

}

