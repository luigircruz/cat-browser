import { Cat } from "../types/cat";
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

export async function getCatDetail({ params }: { params: { catId: string } }) {
  try {
    const response = await axios.get(`/images/${params.catId}`);
    const catDetail = response.data as Cat;

    return { catDetail };
  } catch (error) {
    console.error(error);
  }
}

export async function getBreed(breedId: string) {
  return axios.get(`/breeds/${breedId}`);
}

export async function getBreedFacts(breedId: string) {
  return axios.get(`/breeds/${breedId}/facts`);
}

export async function searchBreeds(query: string) {
  return axios.get(`/breeds/search?q=${query}&attach_image=1`);
}

export async function getBreedImage(
  breedId: string,
  page: number = 1,
  limit: number = 10
) {
  return axios.get(
    `/images/search?page=${page}&limit=${limit}&breed_id=${breedId}`
  );
}
