import { useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CatBreedList from "../components/compositions/cat-breed-list";
import CatBreedsSelector from "../components/compositions/cat-breeds-selector";
import { useCatImagesByBreedContext } from "../contexts/images-by-breed.context";
import { CatBreedImage } from "../types/cat-breed-image";
import { isDeepEqual } from "../utils/equal";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cats, setCats] = useState<CatBreedImage[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>(
    searchParams.get("breed") as string
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

  return (
    <section aria-label="home-page" className="Home">
      <Container>
        <Stack gap={3}>
          <h1>Cat Browser</h1>
          <Row>
            <Col md={3} sm={6} xs={12}>
              <CatBreedsSelector
                onBreedSelectChange={onBreedSelectChange}
                selectedBreed={selectedBreed}
              />
            </Col>
          </Row>
          <Row>
            {selectedBreed ? (
              <CatBreedList setCats={setCats} />
            ) : (
              <div>No cats available</div>
            )}
          </Row>
          {!isLastPage && selectedBreed && (
            <Row>
              <Col xs={12}>
                <Button
                  type="button"
                  variant="success"
                  onClick={handleOnLoadMoreClick}
                >
                  Load more
                </Button>
              </Col>
            </Row>
          )}
        </Stack>
      </Container>
    </section>
  );
}
