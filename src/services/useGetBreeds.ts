import { CatBreed } from "@/types/cat-breed";
import useRequest from "@/utils/useRequest";

export default function useGetBreeds() {
  return useRequest<CatBreed[]>({
    url: "/breeds",
  });
}
