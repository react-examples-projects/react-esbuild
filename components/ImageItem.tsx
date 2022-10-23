import useLazyloadImage from "hooks/useLazyLoadImage";
import skeleton from "../assets/skeleton.gif";
import React from "react";

interface IProps {
  url: string;
  anime_name: string;
}

export default function ImageItem({ url, anime_name }: IProps) {
  const { ref } = useLazyloadImage(url);
  return (
    <div className="w-100">
      <img
        className="d-block rounded-3 img-fluid w-100 img-post"
        src={skeleton}
        alt={anime_name}
        title={anime_name}
        style={{ objectFit: "cover", maxHeight: "300px" }}
        ref={ref}
      />
      <p>{anime_name}</p>
    </div>
  );
}
