import { CatBreed } from "./cat-breed";

export interface Cat {
  id: string;
  url: string;
  breeds: CatBreed[];
  width: number;
  height: number;
}
