import { Card, Col } from "react-bootstrap";
import { CatBreedImage } from "../../../types/cat-breed-image";
import ButtonLink from "../../shared/button";
import useGetImagesByBreed from "../../../services/useGetImagesByBreed";
import { useSearchParams } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function CatBreedList({
  setCats,
}: {
  setCats: Dispatch<SetStateAction<CatBreedImage[]>>;
}) {
  const [searchParams] = useSearchParams();
  const { data } = useGetImagesByBreed(searchParams);

  useEffect(() => {
    if (data) {
      setCats(data);
    }
  }, [data, setCats]);

  return (
    <>
      {data?.map((cat) => (
        <Col key={cat.id} md={3} sm={6} xs={12}>
          <Card>
            <Card.Img
              variant="top"
              src={cat.url}
              alt="Cat breed"
              loading="lazy"
              className="breed-list-item"
            />
            <Card.Body>
              <ButtonLink href={`/cat/${cat.id}`}>View details</ButtonLink>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
}
