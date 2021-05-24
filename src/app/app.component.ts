import { Component } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-ze';

  constructor(private searchService: SearchService) {}

  teste() {
    this.searchService.distributorSearch(1, 2).subscribe(res => {
      console.log(res);
    });
  }

  teste2() {
    this.searchService.productSearch(532).subscribe(res => {
      console.log(res);
    });
  }

  teste3() {
    this.searchService.categorySearch().subscribe(res => {
      console.log(res);
    });
  }


}
