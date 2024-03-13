import CatBreedList from "@/components/compositions/cat-breed-list";
import CatBreedsSelector from "@/components/compositions/cat-breeds-selector";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import Controller from "./controller";

export default function HomePage() {
  const controller = Controller();

  return (
    <section aria-label="home-page" className="Home">
      <Container>
        <Stack gap={3}>
          <h1>Cat Browser</h1>
          <Row>
            <Col md={3} sm={6} xs={12}>
              <CatBreedsSelector
                onBreedSelectChange={controller.onBreedSelectChange}
                selectedBreed={controller.selectedBreed}
              />
            </Col>
          </Row>
          <Row>
            {controller.selectedBreed ? (
              <CatBreedList setCats={controller.setCats} />
            ) : (
              <div>No cats available</div>
            )}
          </Row>
          {!controller.isLastPage && controller.selectedBreed && (
            <Row>
              <Col xs={12}>
                <Button
                  type="button"
                  variant="success"
                  onClick={controller.handleOnLoadMoreClick}
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
