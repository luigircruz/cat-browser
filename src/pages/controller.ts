import { useCatImagesByBreedContext } from "@/contexts/images-by-breed.context";
import { CatBreedImage } from "@/types/cat-breed-image";
import { isDeepEqual } from "@/utils/equal";
import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function Controller() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cats, setCats] = useState<CatBreedImage[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>(
    searchParams.get("breed") ?? ""
  );
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const { catImagesByBreedData, setCatImagesByBreedData } =
    useCatImagesByBreedContext();

  async function onBreedSelectChange(breedId: string) {
    setSelectedBreed(breedId);
    setIsLastPage(false);
  }

  function handleOnLoadMoreClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setPage((prevPage) => prevPage + 1);

    const queryParams = createSearchParams({
      breed: selectedBreed,
      page: String(page + 1),
      limit: "10",
    }).toString();

    navigate({
      pathname: "/",
      search: queryParams,
    });

    if (isDeepEqual(cats, catImagesByBreedData)) {
      setIsLastPage(true);
      return;
    } else {
      setCatImagesByBreedData((prevState) => [...prevState, ...cats]);
    }
  }
  return {
    onBreedSelectChange,
    handleOnLoadMoreClick,
    cats,
    setCats,
    selectedBreed,
    setSelectedBreed,
    isLastPage,
    setIsLastPage,
  };
}
