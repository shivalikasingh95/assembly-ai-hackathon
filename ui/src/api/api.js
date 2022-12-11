import axios from "axios";
import MESSAGE from "./apiMessage";
import { toast } from "react-toastify";

const API_ROOT = "http://localhost:8001/api/v1/";

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
  const data = {
    text_prompt: params?.input
  };
  return axios
    .post(`${API_ROOT}bg_music`, data)
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