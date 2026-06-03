export interface HeroSlide {
  _id?: string;
  badge?: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
  image: string;
  imageClass?: string;
  active: boolean;
  order: number;
}