import { VehicleFeature } from "../vehicle-features/vehicle-feature.interface";

export interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  derivative: string;
  engineSize: string;
  transmission: Transmission;
  bodyStyle: BodyStyle;
  fuelType: FuelType;
  features: VehicleFeature[];
  colour: string;
  doors: number;
  previousOwners?: number;
  service?: Date;
  mot?: Date;
  price: number;
  mileage: number;
  thumbnail: Image;
  images: Image[];
}

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';

export type Transmission = 'Automatic' | 'Manual';

export type BodyStyle = '4x4' | 'Convertible' | 'Coupe' | 'Estate' | 'Hatchback' | 'MPV' | 'Roadster' | 'Saloon';

export interface Image {
  url: string;
  title: string;
}
