import axios from "axios";
import MESSAGE from "./apiMessage";
import { toast } from "react-toastify";

const API_ROOT = "http://localhost:8001/api/v1/";

export const postLyric = (params) => {
  const data = {
    text_prompt: params?.input,
    max_tokens: params?.maxLength,
    temperature: params?.temperature,
    frequency_penalty: params?.frequency,
    genre: params?.genre?.toLowerCase(),
  };
  return axios
    .post(`${API_ROOT}lyrics/generate`, data)
    .then((res) => {
      if (res?.status === 201) {
        toast.success(MESSAGE.SUC_POST_LYRIC, { theme: "dark" });
        return res?.data;
      } else throw res;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || MESSAGE.ERR_POST_LYRIC, {
        theme: "dark",
      });
    });
};

export const postAlbumCover = (params) => {
  const data = {
    text_prompt: params?.input,
    num_outputs: params?.imageCount,
    guidance_scale: params?.guidance,
    num_inference_steps: params?.inference,
    image_width: params?.imageWeight,
    image_height: params?.imageHeight,
    model_choice: params?.modelChoice?.name?.toLowerCase(),
  };
  return axios
    .post(`${API_ROOT}cover_art/generate`, data)
    .then((res) => {
      if (res?.status === 201) {
        toast.success(MESSAGE.SUC_POST_ALBUM, { theme: "dark" });
        return res?.data;
      } else throw res;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || MESSAGE.ERR_POST_ALBUM, {
        theme: "dark",
      });
    });
};

export const postBgMusic = (params) => {
  let data;
  let config;
  if (params?.type === "s3") {
    data = {
      url: params?.input
    };
    config = {
      headers: {
        'content-type': 'application/json',
      },
    };
  } else {
    data = new FormData();
    data.append('prime_measure_count', params?.measureCount);
    data.append('audiofile', params?.input);
    data.append('fileName', params?.input?.name);
    config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
  }
  return axios
    .post(`${API_ROOT}${params?.type === "s3" ? "music/example/generate" : "music/upload/generate"}`, data, config)
    .then((res) => {
      if (res?.status === 201) {
        toast.success(MESSAGE.SUC_POST_BG_MUSIC, { theme: "dark" });
        return res?.data;
      } else throw res;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || MESSAGE.ERR_POST_BG_MUSIC, {
        theme: "dark",
      });
    });
};