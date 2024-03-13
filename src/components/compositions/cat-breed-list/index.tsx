import ButtonLink from "@/components/shared/button";
import { useCatImagesByBreedContext } from "@/contexts/images-by-breed.context";
import useGetImagesByBreed from "@/services/useGetImagesByBreed";
import { CatBreedImage } from "@/types/cat-breed-image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function CatBreedList({
  setCats,
}: {
  setCats: Dispatch<SetStateAction<CatBreedImage[]>>;
}) {
  const [searchParams] = useSearchParams();
  const { data } = useGetImagesByBreed(searchParams);
  const { setCatImagesByBreedData } = useCatImagesByBreedContext();

  useEffect(() => {
    if (data) {
      setCats(data);
      setCatImagesByBreedData(data);
    }
  }, [data, setCats, setCatImagesByBreedData]);

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
