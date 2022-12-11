import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

import { postAlbumCover } from "../api/api";
import { override } from "../api/apiLoading";

const ComposeAlbumIndex = () => {
  const [loading, setLoading] = useState(false);
  const [albumInfo, setAlbumInfo] = useState({
    input: "",
    output: [],
    download: "",
    errorMessage: "",
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

  return (
    <div className="compose-lyric-root">
      <div className="compose-lyric-root-inner">
        {loading ? (
          <div className="compose-lyric-root-loading">
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
            <div className="compose-album-input">
              <div className="compose-album-input-heading">
                Album Cover Prompt*
              </div>
              <div className="compose-album-input-box">
                <textarea
                  value={albumInfo?.input}
                  className="compose-album-textarea"
                  onChange={(e) =>
                    handleChangeAlbumInfo("input", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="compose-album-output">
              <div className="compose-album-output-heading">
                Album Cover Output
              </div>
              <div className="compose-album-output-box">
                {albumInfo?.output?.length > 0 &&
                  albumInfo.output.map((album, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          albumInfo?.download === album
                            ? "compose-album-output-box-col-select"
                            : "compose-album-output-box-col"
                        }
                        onClick={() => handleDownloadClick(album)}
                      >
                        <img src={album} width="100%" height="100%" />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="compose-lyric-footer">
              <div className="compose-lyric-footer-error-container">
                {albumInfo?.errorMessage}
              </div>
              <div className="compose-lyric-footer-button-container">
                {albumInfo?.output?.length > 0 ? (
                  <div
                    className="compose-lyric-button"
                    onClick={() => handleDownloadAlbum()}
                  >
                    Download
                  </div>
                ) : null}
                <div
                  style={{ marginLeft: "5%" }}
                  className="compose-lyric-button"
                  onClick={() => handleGenerateAlbum()}
                >
                  Generate
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
