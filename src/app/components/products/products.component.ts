import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  distributorId: number = 0;
  searchTerm: string = '';
  categoryList: Array<any> = [];
  productsList: Array<any> = []; 
  loading: boolean = false; 

  constructor(
    private routes: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.routes.params.subscribe(params => {
      this.distributorId = params['distributorId'];
    });
  }

  ngOnInit(): void {
    this.searchCategory();
  }

  private searchCategory() {
    const lat = localStorage.getItem('sessionLatitude');
    const long = localStorage.getItem('sessionLongitude');

    if (lat && long) {
      this.searchService.categorySearch(lat, long)
        .subscribe((response: any) => this.categoryList = response.data.allCategory);
    }

    this.searchProduct();
  }

  private searchProduct() {   
    this.searchService.productSearch(this.distributorId, this.searchTerm, null)
      .subscribe((res: any) => {
        this.productsList = res.data.poc.products;
        console.log(this.productsList);
        
      });
        
  }





}
