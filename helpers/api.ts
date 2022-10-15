import axios, { AxiosResponse, AxiosError } from "axios";

export const getImage = async () => {
  try {
    const data: AxiosResponse = await axios.get(
      "https://api.waifu.pics/nsfw/waifu"
    );

    return data.data.url;
  } catch (err) {
    const ERROR = err as AxiosError;
    console.error(ERROR.message);
  }
};

export const getImages = async () => {
  const data: AxiosResponse = await axios.get(
    "https://nekos.best/api/v2/hug?amount=20"
  );
  return data.data.results || [];
  // const images = [];
  // for (let i = 0; i < 20; i++) {
  //   images.push(getImage());
  // }

  // return Promise.all(images);
  return [];
};
