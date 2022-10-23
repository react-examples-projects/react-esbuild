import useSWR, { SWRResponse } from "swr";
import { getImages } from "helpers/api";

interface ImageItem {
  url: string;
  anime_name: string;
}

interface IImageResponse extends SWRResponse {
  images: ImageItem[];
}

export default function useImages(): IImageResponse {
  const { data: images, ...args } = useSWR("images", getImages, {
    revalidateOnFocus: false,
  });

  return {
    images,
    ...args,
  };
}
