import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { CatBreedImage } from "../types/cat-breed-image";

type CatImagesByBreedContextTypes = {
  catImagesByBreedData: CatBreedImage[];
  setCatImagesByBreedData: Dispatch<SetStateAction<CatBreedImage[]>>;
  resetImagesByBreedData: () => void;
};

const CatImagesByBreedContext =
  createContext<CatImagesByBreedContextTypes | null>(null);

export function useCatImagesByBreedContext() {
  const context = useContext(CatImagesByBreedContext);
  if (context === null) {
    throw new Error(
      "useCatImagesByBreedContext must be used within a CatImagesByBreedProvider"
    );
  }
  return context;
}

export function CatImagesByBreedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [catImagesByBreedData, setCatImagesByBreedData] = useState<
    CatBreedImage[]
  >([]);
  const resetImagesByBreedData = () => setCatImagesByBreedData([]);

  return (
    <CatImagesByBreedContext.Provider
      value={{
        catImagesByBreedData,
        setCatImagesByBreedData,
        resetImagesByBreedData,
      }}
    >
      {children}
    </CatImagesByBreedContext.Provider>
  );
}
