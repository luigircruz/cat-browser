import { Params } from "react-router-dom";
import { Cat } from "../types/cat";
import useRequest from "../utils/useRequest";

export default function useGetCatDetails(params: Readonly<Params<string>>) {
  return useRequest<Cat>({
    url: `/images/${params.catId}`,
  });
}
