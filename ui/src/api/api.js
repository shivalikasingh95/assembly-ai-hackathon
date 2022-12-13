import axios from "axios";
import MESSAGE from "./apiMessage";
import { toast } from "react-toastify";

const API_ROOT = "http://3.7.63.241/:8000/api/v1/";

export const postLyric = (params) => {
  const data = {
    text_prompt: params?.input
  };
  return axios
    .post(`${API_ROOT}lyric_generation`, data)
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
    text_prompt: params?.input
  };
  return axios
    .post(`${API_ROOT}album_cover`, data)
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
    data.append('file', params?.input);
    data.append('fileName', params?.input?.name);
    config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
  }
  return axios
    .post(`${API_ROOT}${params?.type === "s3" ? "bg_music" : "bg_music_file_input"}`, data, config)
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