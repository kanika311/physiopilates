export interface ICarousel {
  _id?: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}