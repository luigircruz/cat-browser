import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cat } from "../../types/cat";
import { getCatDetail } from "../../services/breeds";
import { Button, Card } from "react-bootstrap";

export default function CatDetails() {
  const params = useParams<{ catId: string }>();
  const [cat, setCat] = useState<Cat>();

  useEffect(() => {
    if (params.catId) {
      getCatDetail(params.catId)
        .then((res) => setCat(res.data))
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [params.catId]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Button as="a" href="/">
            Back
          </Button>
        </Card.Header>
        <Card.Img variant="top" src={cat?.url} />
        <Card.Body>
          {cat?.breeds.map((breed) => (
            <>
              <h1>{breed.name}</h1>
              <h5>Origin: {breed.origin}</h5>
              <h6>{breed.temperament}</h6>
              <p>{breed.description}</p>
            </>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
