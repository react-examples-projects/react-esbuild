import React from "react";
import ImageItem from "components/ImageItem";
import { Grid } from "@nextui-org/react";

interface ImageItem {
  url: string;
  anime_name: string;
}

type ImageListType = {
  images: ImageItem[];
};

export default function ImageList({ images }: ImageListType) {
  return (
    <Grid.Container gap={1} className="mt-3">
      {images.map((img) => (
        <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
          <ImageItem {...img} />
        </Grid>
      ))}
    </Grid.Container>
  );
}
