import { useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CatBreedList from "../components/compositions/cat-breed-list";
import CatBreedsSelector from "../components/compositions/cat-breeds-selector";
import { CatBreedImage } from "../types/cat-breed-image";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cats, setCats] = useState<CatBreedImage[]>([]);
  const [selectedBreed, setSelectedBreed] = useState(
    searchParams.get("breed") ?? ""
  );
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  async function onBreedSelectChange(breedId: string) {
    setSelectedBreed(breedId);
    setIsLastPage(false);
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
                  onClick={async () => {
                    try {
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
                    } catch (error) {
                      console.error("Error fetching data:", error);
                      // Handle error (e.g., show an error message)
                    }
                  }}
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
