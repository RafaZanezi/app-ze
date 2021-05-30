export class Product {
    id: number;
    title: string;
    images: [{
        url: string
    }];
    productVariants: [{
        price: number
    }];
    quantity: number;

    constructor() {
        this.id = 0;
        this.title = '';
        this.images = [{ url: '' }];
        this.productVariants = [{ price: 0 }];
        this.quantity = 0;
    }

}