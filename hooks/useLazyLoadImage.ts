import { useEffect, useRef } from "react";
import lazyLoad from "../helpers/lazyload";
/**
 * Show an image loader placeholder and replace when it's been loaded
 * @param {String} src The original source url
 * @returns {String} The image url
 */
export default function useLazyloadImage(src: string) {
  const imgNodeRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgNodeRef.current) {
      imgNodeRef.current.setAttribute("data-src", src);
      lazyLoad(imgNodeRef.current);
    }
  }, [src]);

  return { ref: imgNodeRef };
}
