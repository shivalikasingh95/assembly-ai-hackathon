import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

import { postLyric } from "../api/api";
import { override } from "../api/apiLoading";

const ComposeLyricIndex = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      lyricsInfo?.errorMessage !== "" &&
        setLyricsInfo({
          ...lyricsInfo,
          errorMessage: "",
        });
      const data = await postLyric(lyricsInfo);
      if (data) {
        setLyricsInfo({
          ...lyricsInfo,
          output: data?.output_lyrics,
        });
      }
      setLoading(false);
    } else {
      setLyricsInfo({
        ...lyricsInfo,
        errorMessage: "Please fill the required fields !!!",
      });
    }
  };

  const handleDownloadLyric = async () => {
    const element = document.createElement("a");
    const file = new Blob([lyricsInfo?.output], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "output-lyric.txt";
    document.body.appendChild(element);
    element.click();
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
            <div className="compose-lyric-input">
              <div className="compose-lyric-input-heading">Lyrics Prompt*</div>
              <div className="compose-lyric-input-box">
                <textarea
                  value={lyricsInfo?.input}
                  className="compose-lyric-textarea-input"
                  onChange={(e) =>
                    handleChangeLyricInfo("input", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="compose-lyric-output">
              <div className="compose-lyric-output-heading">Lyrics Output</div>
              <div className="compose-lyric-output-box">
                <textarea
                  disabled={true}
                  value={lyricsInfo?.output}
                  className="compose-lyric-textarea-output"
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
          </>
        )}
      </div>
    </div>
  );
};

export default ComposeLyricIndex;
