/**
 * Lazy load to images
 * @param {HTMLElement} image - Node type image
 */
export default function lazyLoad(image: HTMLImageElement) {
  function fn(
    entrie: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    const element = entrie[0]?.target as HTMLImageElement;
    const source = element.getAttribute("data-src");
    if (entrie[0]?.isIntersecting && source) {
      console.log("isIntercepting");
      element.src = source as string;

      element.addEventListener("load", (e: Event) => {
        element.classList.add("loaded");
        observer.unobserve(e.target as HTMLImageElement);
        element.removeAttribute("data-src");
      });
    }
  }

  if ("IntersectionObserver" in window) {
    const InObserver = new IntersectionObserver(fn);
    InObserver.observe(image);
  } else {
    console.error("IntersectionObserver no implemented this browser");
  }
}
