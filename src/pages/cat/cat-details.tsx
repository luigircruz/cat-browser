import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useGetCatDetails from "../../services/useGetCatDetails";
import { toast } from "sonner";

export default function CatDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: catDetail, isValidating, error } = useGetCatDetails(params);

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(
      "Apologies but we could not load new cats for you at this time! Miau!"
    );
  }

  return (
    <Card>
      <Card.Header>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Card.Header>
      <Card.Img variant="top" src={catDetail?.url} />
      <Card.Body>
        {catDetail?.breeds.map((breed) => (
          <>
            <h1>{breed.name}</h1>
            <h5>Origin: {breed.origin}</h5>
            <h6>{breed.temperament}</h6>
            <p>{breed.description}</p>
          </>
        ))}
      </Card.Body>
    </Card>
  );
}
