export class Position {
    lat: string;
    lon: string;

    constructor() {
        this.lat = '';
        this.lon = '';
    }
}

export class Address {
    address: {
        streetName: string;
        freeformAddress: string;
        municipality: string;
        countrySubdivision: string;
    }

    position: Position;

    constructor() {
        this.address = {
            streetName: '',
            freeformAddress: '',
            municipality: '',
            countrySubdivision: ''
        };

        this.position = new Position();
    }
}