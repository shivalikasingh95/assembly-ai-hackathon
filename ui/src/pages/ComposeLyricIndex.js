import React, { useState } from "react";

const ComposeLyricIndex = () => {
  const [lyricsInfo, setLyricsInfo] = useState({
    input: "",
    output: "",
    errorMessage: "",
  });

  const handleChangeLyricInfo = (key, val) => {
    setLyricsInfo({
      ...lyricsInfo,
      [key]: val,
    });
  };

  const handleGenerateLyic = async () => {
    if (lyricsInfo?.input) {
    } else {
      setLyricsInfo({
        ...lyricsInfo,
        errorMessage: "Please fill the required fields !!!",
      });
    }
  };

  const handleDownloadLyric = async () => {};

  return (
    <div className="compose-lyric-root">
      <div className="compose-lyric-root-inner">
        <div className="compose-lyric-input">
          <div className="compose-lyric-input-heading">Lyrics Prompt*</div>
          <div className="compose-lyric-input-box">
            <textarea
              value={lyricsInfo?.input}
              className="compose-lyric-textarea"
              onChange={(e) => handleChangeLyricInfo("input", e.target.value)}
            />
          </div>
        </div>
        <div className="compose-lyric-output">
          <div className="compose-lyric-output-heading">Lyrics Output</div>
          <div className="compose-lyric-output-box">
            <textarea
              disabled={true}
              value={lyricsInfo?.output}
              className="compose-lyric-textarea"
            />
          </div>
        </div>
        <div className="compose-lyric-footer">
          <div className="compose-lyric-footer-error-container">
            {lyricsInfo?.errorMessage}
          </div>
          <div className="compose-lyric-footer-button-container">
            {lyricsInfo?.output ? (
              <div
                className="compose-lyric-button"
                onClick={() => handleDownloadLyric()}
              >
                Download
              </div>
            ) : null}
            <div
              style={{ marginLeft: "5%" }}
              className="compose-lyric-button"
              onClick={() => handleGenerateLyic()}
            >
              Generate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeLyricIndex;
