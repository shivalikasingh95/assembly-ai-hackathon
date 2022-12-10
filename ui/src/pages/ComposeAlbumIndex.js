import React, { useState } from "react";

const ComposeAlbumIndex = () => {
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
            <textarea
              disabled={true}
              value={albumInfo?.output}
              className="compose-lyric-textarea"
            />
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
