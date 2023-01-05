import { toast } from "react-toastify";
import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

import { postLyric } from "../api/api";
import CopyIcon from "../images/copy.svg";
import { override } from "../api/apiLoading";
import SkeletonLoading from "../components/skeletonLoading";

const genreList = [
  { id: 1, name: "Pop" },
  { id: 2, name: "Rap" },
  { id: 3, name: "Rock" },
  { id: 4, name: "Metal" },
  { id: 5, name: "Generic" },
];

const COPY_SUCCESS = "Copied successfully!!!";
const COPY_FAILURE = "Error occured during copying!!!";

const ComposeLyricIndex = () => {
  const [loading, setLoading] = useState(false);
  const [lyricsInfo, setLyricsInfo] = useState({
    input: "",
    output: "",
    frequency: 0,
    temperature: 0,
    maxLength: 256,
    errorMessage: "",
    genre: genreList[4]?.name,
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

  const copyToClipboard = async (textToCopy) => {
    //navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      try {
        await navigator.clipboard.writeText(textToCopy);
        toast.success(COPY_SUCCESS, { theme: "dark" });
      } catch (err) {
        toast.error(COPY_FAILURE, { theme: "dark" });
      }
    } else {
      var textarea = document.createElement("textarea");
      textarea.textContent = textToCopy;
      document.body.appendChild(textarea);
      // make the textarea out of viewport
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";

      var selection = document.getSelection();
      var range = document.createRange();
      //range.selectNodeContents(textarea);
      range.selectNode(textarea);
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand("copy")
          ? toast.success(COPY_SUCCESS, { theme: "dark" })
          : toast.error(COPY_FAILURE, { theme: "dark" });
      } catch (err) {
        toast.error(COPY_FAILURE, { theme: "dark" });
      }
      selection.removeAllRanges();
      document.body.removeChild(textarea);
    }
  };

  // console.log("lyricsInfo", lyricsInfo);

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
              <div className="cl-page-title">Write lyrics</div>
              <div className="cl-form-input-title">Genre</div>
              <div className="cl-choice-root">
                {genreList?.length > 0 &&
                  genreList.map((glc, ind) => {
                    return (
                      <div
                        key={ind}
                        className={
                          glc?.name === lyricsInfo?.genre
                            ? "cl-choice-root-box-selected"
                            : "cl-choice-root-box"
                        }
                        onClick={() =>
                          handleChangeLyricInfo("genre", glc?.name)
                        }
                      >
                        {glc?.name}
                      </div>
                    );
                  })}
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Prompt*</div>
                <div className="cl-input-textarea-root">
                  <textarea
                    value={lyricsInfo?.input}
                    className="cl-input-textarea"
                    onChange={(e) =>
                      handleChangeLyricInfo("input", e.target.value)
                    }
                    placeholder="E.g write a song like Drake about how sad it is when last doughnut is a bit sour"
                  />
                </div>
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Max length</div>
                <div className="cl-form-input-subtitle">
                  The maximum number of tokens to generate
                </div>
                <div className="cl-slider-root">
                  <div className="cl-slider-root-left">
                    <div class="slidecontainer">
                      <input
                        min="1"
                        max="4000"
                        type="range"
                        class="slider"
                        value={lyricsInfo?.maxLength}
                        onChange={(e) =>
                          handleChangeLyricInfo("maxLength", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="cl-slider-root-right">
                    {lyricsInfo?.maxLength}
                  </div>
                </div>
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Temperature</div>
                <div className="cl-form-input-subtitle">
                  Set higher values for more randomness
                </div>
                <div className="cl-slider-root">
                  <div className="cl-slider-root-left">
                    <div class="slidecontainer">
                      <input
                        min="0"
                        max="1.00"
                        step="0.01"
                        type="range"
                        class="slider"
                        value={lyricsInfo?.temperature}
                        onChange={(e) =>
                          handleChangeLyricInfo("temperature", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="cl-slider-root-right">
                    {lyricsInfo?.temperature}
                  </div>
                </div>
              </div>
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Frequency penalty</div>
                <div className="cl-form-input-subtitle">
                  Set higher values to increase likelihood of repeating lines
                </div>
                <div className="cl-slider-root">
                  <div className="cl-slider-root-left">
                    <div class="slidecontainer">
                      <input
                        min="0"
                        max="2.00"
                        step="0.01"
                        type="range"
                        class="slider"
                        value={lyricsInfo?.frequency}
                        onChange={(e) =>
                          handleChangeLyricInfo("frequency", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="cl-slider-root-right">
                    {lyricsInfo?.frequency}
                  </div>
                </div>
              </div>
              {lyricsInfo?.errorMessage ? (
                <div className="cl-error">{lyricsInfo?.errorMessage}</div>
              ) : null}
              <div className="cl-submit" onClick={() => handleGenerateLyic()}>
                Generate
              </div>
            </div>
            <div className="cl-right-root">
              <div className="cl-right-root-top">
                {lyricsInfo?.output ? (
                  <>{lyricsInfo?.output}</>
                ) : (
                  <>
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                  </>
                )}
              </div>
              <div className="cl-right-root-bottom">
                <div
                  className="cl-right-root-bottom-copy"
                  onClick={() => copyToClipboard(lyricsInfo?.output)}
                >
                  <img src={CopyIcon} alt="Copy" height="100%" />
                  {` Copy`}
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
