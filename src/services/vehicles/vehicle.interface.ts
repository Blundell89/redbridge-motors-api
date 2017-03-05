export interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  derivative: string;
  fuelType: FuelType;
  features: VehicleFeature[];
  price: number;
  mileage: number;
  thumbnail: Image;
  images: Image[];
}

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';


export interface VehicleFeature {
  name: string;
}

export interface Image {
  url: string;
  title: string;
}
