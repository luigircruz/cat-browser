import { FormSelect } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import useGetBreeds from "../../../services/useGetBreeds";
import { useEffect, useState } from "react";

export default function CatBreedsSelector({
  selectedBreed,
  onBreedSelectChange,
}: {
  selectedBreed: string;
  onBreedSelectChange: (breedId: string) => Promise<void>;
}) {
  const navigate = useNavigate();
  const { data: catBreeds, isValidating } = useGetBreeds();
  const [breed, setBreed] = useState(selectedBreed);

  useEffect(() => {
    setBreed(selectedBreed);
  }, [selectedBreed]);

  return (
    <FormSelect
      aria-label="Cat breeds"
      defaultValue={breed}
      onChange={(e) => {
        onBreedSelectChange(e.currentTarget.value);

        const queryParams = createSearchParams({
          breed: e.currentTarget.value,
          page: "1",
          limit: "10",
        }).toString();

        navigate({
          search: queryParams,
        });
      }}
      disabled={isValidating}
    >
      <option value="">Select breed</option>
      {catBreeds?.map((catBreed) => (
        <option key={catBreed.id} value={catBreed.id}>
          {catBreed.name}
        </option>
      ))}
    </FormSelect>
  );
}
