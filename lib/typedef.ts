export type Parking = {
    id: number;
    capacity: number;
    freePlaces: number;
    type: ParkingType;
    pricePerHour: number;
    pricePerDay: number;
    pricePerWeek: number;
    rate: number;
    reviews: number;
    address: Address;
}

export type ParkingRequest = {
    capacity: number;
    freePlaces: number;
    type: ParkingType;
    pricePerHour: number;
    pricePerDay: number;
    pricePerWeek: number;
    rate: number;
    reviews: number;
}

export type Address = {
    id: number;
    street: string;
    city: string;
    longitude: number; // x-coord
    latitude: number;// y-coord
}

export type AddressRequest = {
    street: string;
    city: string;
    longitude: number; // x-coord
    latitude: number;// y-coord
    parkingId: number;
}

export enum ParkingType {
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC",
    UNKNOWN = "UNKNOWN"
}