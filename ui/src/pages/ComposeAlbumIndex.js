import React, { useState } from "react";

import { postAlbumCover } from "../api/api";

const ComposeAlbumIndex = () => {
  const [loading, setLoading] = useState(false);
  const [albumInfo, setAlbumInfo] = useState({
    input: "",
    output: "",
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

  const handleDownloadAlbum = async () => {};

  return (
    <div className="compose-lyric-root">
      <div className="compose-lyric-root-inner">
        <div className="compose-lyric-input">
          <div className="compose-lyric-input-heading">Album Cover Prompt*</div>
          <div className="compose-lyric-input-box">
            <textarea
              value={albumInfo?.input}
              className="compose-lyric-textarea"
              onChange={(e) => handleChangeAlbumInfo("input", e.target.value)}
            />
          </div>
        </div>
        <div className="compose-lyric-output">
          <div className="compose-lyric-output-heading">Album Cover Output</div>
          <div className="compose-lyric-output-box">
            {albumInfo?.output ? (
              <textarea
                disabled={true}
                value={albumInfo?.output}
                className="compose-lyric-textarea"
              />
            ) : (
              <img src={albumInfo?.output} />
            )}
          </div>
        </div>
        <div className="compose-lyric-footer">
          <div className="compose-lyric-footer-error-container">
            {albumInfo?.errorMessage}
          </div>
          <div className="compose-lyric-footer-button-container">
            {albumInfo?.output ? (
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
      </div>
    </div>
  );
};

export default ComposeAlbumIndex;
