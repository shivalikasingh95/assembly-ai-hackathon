import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

import { postAlbumCover } from "../api/api";
import { override } from "../api/apiLoading";
import DownloadIcon from "../images/download.png";

const modelList = [
  { id: 1, name: "Default" },
  { id: 2, name: "Replicate" },
  { id: 3, name: "Custom" },
];

const imagePixelList = [
  { id: 1, name: 128 },
  { id: 2, name: 256 },
  { id: 3, name: 512 },
  { id: 4, name: 768 },
  { id: 5, name: 1024 },
];

const ComposeAlbumIndex = () => {
  const [loading, setLoading] = useState(false);
  const [albumInfo, setAlbumInfo] = useState({
    input: "",
    output: [],
    guidance: 1,
    download: "",
    inference: 1,
    imageCount: 1,
    errorMessage: "",
    modelChoice: modelList[0],
    imageHeight: imagePixelList[2]?.name,
    imageWeight: imagePixelList[2]?.name,
  });

  const handleChangeAlbumInfo = (key, val) => {
    setAlbumInfo({
      ...albumInfo,
      [key]: val,
    });
  };

  const handleGenerateAlbum = async () => {
    if (albumInfo?.input) {
      setLoading(true);
      albumInfo?.errorMessage !== "" &&
        setAlbumInfo({
          ...albumInfo,
          errorMessage: "",
        });
      const data = await postAlbumCover(albumInfo);
      if (data) {
        setAlbumInfo({
          ...albumInfo,
          output: data?.output_album,
        });
      }
      setLoading(false);
    } else {
      setAlbumInfo({
        ...albumInfo,
        errorMessage: "Please fill the required fields !!!",
      });
    }
  };

  const handleDownloadClick = (data) => {
    setAlbumInfo({
      ...albumInfo,
      download: data,
    });
  };

  const handleDownloadAlbum = async () => {
    if (albumInfo?.download) {
      albumInfo?.errorMessage !== "" &&
        setAlbumInfo({
          ...albumInfo,
          errorMessage: "",
        });
      const image = await fetch(albumInfo?.download);
      // Split image name
      const nameSplit = albumInfo?.download.split("/");
      const duplicateName = nameSplit.pop();
      // Download image
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "" + duplicateName + "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setAlbumInfo({
        ...albumInfo,
        errorMessage: "Please select an image to download !!!",
      });
    }
  };

  // console.log("albumInfo", albumInfo);

  return (
    <div className="cl-root">
      <div className="cl-root-inner">
        {loading ? (
          <div className="cl-root-loading">
            <FadeLoader
              width={5}
              radius={2}
              margin={2}
              height={15}
              css={override}
              color={"#4279f4"}
              loading={loading}
            />
          </div>
        ) : (
          <>
            <div className="cl-left-root">
              <div className="cl-page-title">Make album art</div>
              <div className="cl-form-input-title">Model choice</div>
              <div className="ca-choice-root">
                {modelList?.length > 0 &&
                  modelList.map((mlc, ind) => {
                    return (
                      <div
                        key={ind}
                        className={
                          mlc?.name === albumInfo?.modelChoice?.name
                            ? "ca-choice-root-box-selected"
                            : "ca-choice-root-box"
                        }
                        onClick={() =>
                          handleChangeAlbumInfo("modelChoice", mlc)
                        }
                      >
                        {mlc?.name}
                      </div>
                    );
                  })}
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Prompt*</div>
                <div className="cl-input-textarea-root">
                  <textarea
                    value={albumInfo?.input}
                    className="cl-input-textarea"
                    onChange={(e) =>
                      handleChangeAlbumInfo("input", e.target.value)
                    }
                    placeholder="E.g make an album art inspired by rock & grunge from 90s and early 2000s"
                  />
                </div>
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Guidance scale</div>
                <div className="cl-form-input-subtitle">
                  Decides how close the result matches the prompt
                </div>
                <div className="cl-slider-root">
                  <div className="cl-slider-root-left">
                    <div class="slidecontainer">
                      <input
                        min="1"
                        max="20"
                        step="0.01"
                        type="range"
                        class="slider"
                        value={albumInfo?.guidance}
                        onChange={(e) =>
                          handleChangeAlbumInfo("guidance", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="cl-slider-root-right">
                    {albumInfo?.guidance}
                  </div>
                </div>
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Inference steps</div>
                <div className="cl-form-input-subtitle">
                  A line that describes this control
                </div>
                <div className="cl-slider-root">
                  <div className="cl-slider-root-left">
                    <div class="slidecontainer">
                      <input
                        min="0"
                        max="500"
                        type="range"
                        class="slider"
                        value={albumInfo?.inference}
                        onChange={(e) =>
                          handleChangeAlbumInfo("inference", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="cl-slider-root-right">
                    {albumInfo?.inference}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }} className="cl-form-input-group">
                <div className="ca-imgpix-left">
                  <div className="cl-form-input-title">Height</div>
                  <div>
                    <select
                      value={albumInfo?.imageHeight}
                      style={{ height: "4vh", width: "100%" }}
                      onChange={(e) =>
                        handleChangeAlbumInfo("imageHeight", e.target.value)
                      }
                    >
                      {imagePixelList.map((optionVal) => (
                        <option key={optionVal?.id} value={optionVal?.name}>
                          {`${optionVal?.name} px`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="ca-imgpix-right">
                  <div className="cl-form-input-title">Width</div>
                  <div>
                    <select
                      value={albumInfo?.imageWeight}
                      style={{ height: "4vh", width: "100%" }}
                      onChange={(e) =>
                        handleChangeAlbumInfo("imageWeight", e.target.value)
                      }
                    >
                      {imagePixelList.map((optionVal) => (
                        <option key={optionVal?.id} value={optionVal?.name}>
                          {`${optionVal?.name} px`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">No.of images</div>
                <div className="cl-form-input-subtitle">
                  Number of images you want to generate
                </div>
                <div className="cl-slider-root">
                  <div className="cl-slider-root-left">
                    <div class="slidecontainer">
                      <input
                        min="1"
                        max="4"
                        type="range"
                        class="slider"
                        value={albumInfo?.imageCount}
                        onChange={(e) =>
                          handleChangeAlbumInfo("imageCount", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="cl-slider-root-right">
                    {albumInfo?.imageCount}
                  </div>
                </div>
              </div>
              {albumInfo?.errorMessage ? (
                <div className="cl-error">{albumInfo?.errorMessage}</div>
              ) : null}
              <div className="cl-submit" onClick={() => handleGenerateAlbum()}>
                Generate
              </div>
            </div>
            <div className="cl-right-root">
              <div className="cl-right-root-top">
                {albumInfo?.output?.length === 0 && null}
                {albumInfo?.output?.length === 1 && (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={albumInfo?.output[0]}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        border:
                          albumInfo?.download === albumInfo?.output[0]
                            ? "1px solid #455edd"
                            : "",
                      }}
                      onClick={() => handleDownloadClick(albumInfo?.output[0])}
                    />
                  </div>
                )}
                {albumInfo?.output?.length > 1 && (
                  <div className="ca-image-root">
                    {albumInfo.output.map((alo, ind) => {
                      return (
                        <div
                          key={ind}
                          className={
                            alo === albumInfo?.download
                              ? "ca-image-root-box-selected"
                              : "ca-image-root-box"
                          }
                          onClick={() => handleDownloadClick(alo)}
                        >
                          <img src={alo} width="100%" height="100%" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="cl-right-root-bottom">
                <div
                  className="cl-right-root-bottom-copy"
                  onClick={() => handleDownloadAlbum()}
                >
                  <img src={DownloadIcon} alt="Copy" height="100%" />
                  {` Download`}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComposeAlbumIndex;
