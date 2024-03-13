import { Cat } from "@/types/cat";
import useRequest from "@/utils/useRequest";
import { Params } from "react-router-dom";

export default function useGetCatDetails(params: Readonly<Params<string>>) {
  return useRequest<Cat>({
    url: `/images/${params.catId}`,
  });
}
