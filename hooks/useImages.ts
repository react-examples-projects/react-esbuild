import useSWR from "swr";
import { getImages } from "helpers/api";

export default function useImages() {
  const { data: images, ...args } = useSWR("images", getImages, {
    revalidateOnFocus: false,
  });

  return {
    images,
    ...args,
  };
}
