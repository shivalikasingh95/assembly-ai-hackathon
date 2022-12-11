import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

import { postBgMusic } from "../api/api";
import { override } from "../api/apiLoading";

const ComposeBgMusicIndex = () => {
  const [loading, setLoading] = useState(false);
  const [bgMusicInfo, setBgMusicInfo] = useState({
    input: null,
    output: "",
    errorMessage: "",
  });

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    if (event.target.files && event.target.files.length > 0) {
      setBgMusicInfo({
        ...bgMusicInfo,
        input: event.target.files[0],
      });
    }
  };

  const handleGenerateBgMusic = async () => {
    if (bgMusicInfo?.input) {
      setLoading(true);
      bgMusicInfo?.errorMessage !== "" &&
        setBgMusicInfo({
          ...bgMusicInfo,
          errorMessage: "",
        });
      const data = await postBgMusic(bgMusicInfo);
      if (data) {
        setBgMusicInfo({
          ...bgMusicInfo,
          output: data?.output_bgmusic,
        });
      }
      setLoading(false);
    } else {
      setBgMusicInfo({
        ...bgMusicInfo,
        errorMessage: "Please fill the required fields !!!",
      });
    }
  };

  const handleDownloadBgMusic = async () => {
    // Split mp3 name
    const nameSplit = bgMusicInfo?.output.split("/");
    const duplicateName = nameSplit.pop();
    let blob = new Blob([bgMusicInfo?.output]);
    //downloading the file depends on the browser
    //IE handles it differently than chrome/webkit
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, duplicateName);
    } else {
      let objectUrl = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = objectUrl;
      link.setAttribute("download", duplicateName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  console.log("bgMusicInfo", bgMusicInfo);

  return (
    <div className="compose-bgmusic-root">
      <div className="compose-bgmusic-root-inner">
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
            <div className="compose-bgmusic-inputContainer">
              <div className="compose-bgmusic-heading">
                Background Music Prompt*
              </div>
              <input type="file" onChange={onFileChange} />
            </div>
            <div className="compose-bgmusic-outputContainer">
              <div className="compose-bgmusic-heading">
                Background Music Output
              </div>
              <audio id="player" controls>
                <source type="audio/mp3" src={bgMusicInfo?.output} />
              </audio>
            </div>
            <div className="compose-lyric-footer">
              <div className="compose-lyric-footer-error-container">
                {bgMusicInfo?.errorMessage}
              </div>
              <div className="compose-lyric-footer-button-container">
                {bgMusicInfo?.output ? (
                  <div
                    className="compose-lyric-button"
                    onClick={() => handleDownloadBgMusic()}
                  >
                    Download
                  </div>
                ) : null}
                <div
                  style={{ marginLeft: "5%" }}
                  className="compose-lyric-button"
                  onClick={() => handleGenerateBgMusic()}
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

export default ComposeBgMusicIndex;
