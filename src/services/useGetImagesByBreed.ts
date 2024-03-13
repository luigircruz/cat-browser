import { CatBreedImage } from "@/types/cat-breed-image";
import useRequest from "@/utils/useRequest";

export default function useGetImagesByBreed(searchParams: URLSearchParams) {
  const breed = searchParams.get("breed");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  return useRequest<CatBreedImage[]>({
    url: `/images/search?page=${page ?? 1}&limit=${
      limit ?? 10
    }&breed_id=${breed}`,
  });
}
