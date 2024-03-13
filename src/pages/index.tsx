import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormSelect,
  Row,
  Stack,
} from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { getBreedImage, getBreeds } from "../services/breeds";
import { CatBreedImage } from "../types/cat-breed-image";

export default function HomePage() {
  const data = useLoaderData() as Awaited<ReturnType<typeof getBreeds>>;
  const [selectedBreed, setSelectedBreed] = useState("");
  const [cats, setCats] = useState<CatBreedImage[]>([]);

  useEffect(() => {
    if (selectedBreed) {
      getBreedImage(selectedBreed)
        .then((res) => setCats(res.data))
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [selectedBreed]);

  return (
    <section aria-label="home-page">
      <Container>
        <Stack gap={3}>
          <h1>Cat Browser</h1>
          <Row>
            <Col xs={12}>
              <FormSelect
                aria-label="Cat breeds"
                onChange={(e) => setSelectedBreed(e.currentTarget.value)}
              >
                <option value="">Select breed</option>
                {data?.breeds.map((breed) => (
                  <option key={breed.id} value={breed.id}>
                    {breed.name}
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
          <Row>
            {selectedBreed ? (
              <>
                {cats.map((cat) => (
                  <Col md={3} sm={6} xs>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={cat.url}
                        alt="Cat breed"
                        loading="lazy"
                      />
                      <Card.Body>
                        <Button as="a" href={`/${cat.id}`}>
                          View details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>
            ) : (
              <div>No cat selected</div>
            )}
          </Row>
          <Row>
            <Col xs={12}>
              <Button type="button" variant="success" disabled>
                Load more
              </Button>
            </Col>
          </Row>
        </Stack>
      </Container>
    </section>
  );
}
