import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/products.model';
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
  productsList: Array<Product>;
  loading: boolean = false;

  constructor(
    private routes: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.productsList = new Array<Product>();
    this.routes.params.subscribe(params => {
      this.distributorId = params['distributorId'];
    });
  }

  ngOnInit(): void {
    this.searchCategory();
  }

  private searchCategory() {
    this.loading = true;
    const lat = localStorage.getItem('sessionLatitude');
    const long = localStorage.getItem('sessionLongitude');

    if (lat && long) {
      this.searchService.categorySearch(lat, long)
        .subscribe((response: any) => {
          this.categoryList = response.data.allCategory;
          this.searchProduct();
        },
          () => {
            window.alert('Ocorreu um erro ao processar');
            this.loading = false;
          });
    }
  }

  searchProduct(categoryId?: string) {
    this.loading = true;
    this.productsList = new Array<Product>();

    this.searchService.productSearch(this.distributorId, this.searchTerm, null)
      .subscribe((res: any) => {
        this.productsList = res.data.poc.products;
        this.productsList.map(product => product['quantity'] = 0);
      },
        () => window.alert('Ocorreu um erro ao processar'),
        () => this.loading = false);

  }

  add(productId: number) {
    const index = this.productsList.findIndex(product => product.id === productId);
    if (index > -1) {
      this.productsList[index].quantity = this.productsList[index].quantity + 1;
    }
  }

  remove(productId: number) {
    const index = this.productsList.findIndex(product => product.id === productId);
    if (index > -1 && this.productsList[index].quantity > 0) {
      this.productsList[index].quantity = this.productsList[index].quantity - 1;
    }
  }

}
