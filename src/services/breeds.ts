import { CatBreed } from "../types/cat-breed";
import axios from "../utils/axios";

export async function getBreeds() {
  try {
    const response = await axios.get("/breeds");
    const breeds = response.data as CatBreed[];

    return { breeds };
  } catch (error) {
    console.error(error);
  }
}
