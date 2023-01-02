import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

import { postBgMusic } from "../api/api";
import { override } from "../api/apiLoading";
import DownloadIcon from "../images/download.png";

const promptList = [
  { id: 1, name: "Input audio" },
  { id: 2, name: "Select an example" },
];

const exampleList = [
  {
    label: "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/bach.mp3",
    value:
      "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/bach.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCmFwLXNvdXRoLTEiSDBGAiEA7OnAleLVS%2Bdb7nxt5bBrhOXxZap2HQ4XZCFfO50FknwCIQC5q8PudLTKjJlcuzdhp4yAEraWyqGDJ8nuNySIBOz4LyrtAgiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDgwODk1NjI5NzY1NyIMNtGsN3FC2gjRdsH5KsECH9KPrl4yTChCvEhf1mNc3xQ7m86hCzQoeapbE7p03b8tapgzKv1AE7kGLr%2Fhhe4nY02ycAXWR2ic27SM%2BeVnEIG18Z5DcksYt02yuaSMkKMG5%2BPhyP%2F7h1fbje9y2UudwmcKOM8ZFpmZNjZNH6tFsjJwpK2fDJ3U8Ty7SqVyDoJasszShPLl%2FfElFIxRLtMqq2x6BZmbbu8%2FoedVsoKTze13d7PkNfu%2FJYoXGOPqc1H%2BHOjXsmrJD0S4%2BSKqkrnS3YSmWh4EFIYtjUed2Cj3D5jVS2XcGLsJfwQ2CykGD7GCMHydChH0nU%2Bly%2F6zPMUh0Kayn80lKFXuTSgQRHFxNqxSZa9saptLYSqgez6W9p%2Fv0DDxupAlseH%2F1YTS96sDyF5T6%2FxyOfQpOu8lQgkKu1INEybLYZctcfiGtH00iIiGMJGF1pwGOrICWSzci1woUM%2FpsHGqj4IARuZwfacVvL8ErhZIGOt89jcqIzxSyxftU6gHEGlJFQo7tSAGWz0XvZ5RszeMekEBxGg3Y%2Bls9VzPkupjaB1VeQfHKATg6goFSJiMNckfE%2BZDuwTTXb0G8sJdYezt87d4XGCs4pIGgGk4jXEv%2FG1JzmJojoh5WjhxoZwnLp7CqCYsZ8kfIY4UzpgUwtNiXwgAYyE13QX3e7BJ%2FlRdinqfozdoxFCFm4lC2BAAR%2FhHqHtgH6AeIY4qWGv%2F3jkj0M6zUiV85tNE9vALzQTM4h2EBZejkqaB2fXbnCbQabxBfs4De45G4UFXS6OxYzy6HhjSis8nnMtyq25HE7Jys%2BpPlIeEOYKJC9SmbfreIHjnBXG4r9z2Bj421JCLG4axPnMvfMzJ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221211T135803Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA3YWMNQG4TDVFTZ75%2F20221211%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=55f098b94c093325f531d2c861a88f817c2aefd4e256ad6de03571f0f9b99c5d",
  },
  {
    label:
      "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/prime_53.mp3",
    value:
      "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/prime_53.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCmFwLXNvdXRoLTEiSDBGAiEA7OnAleLVS%2Bdb7nxt5bBrhOXxZap2HQ4XZCFfO50FknwCIQC5q8PudLTKjJlcuzdhp4yAEraWyqGDJ8nuNySIBOz4LyrtAgiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDgwODk1NjI5NzY1NyIMNtGsN3FC2gjRdsH5KsECH9KPrl4yTChCvEhf1mNc3xQ7m86hCzQoeapbE7p03b8tapgzKv1AE7kGLr%2Fhhe4nY02ycAXWR2ic27SM%2BeVnEIG18Z5DcksYt02yuaSMkKMG5%2BPhyP%2F7h1fbje9y2UudwmcKOM8ZFpmZNjZNH6tFsjJwpK2fDJ3U8Ty7SqVyDoJasszShPLl%2FfElFIxRLtMqq2x6BZmbbu8%2FoedVsoKTze13d7PkNfu%2FJYoXGOPqc1H%2BHOjXsmrJD0S4%2BSKqkrnS3YSmWh4EFIYtjUed2Cj3D5jVS2XcGLsJfwQ2CykGD7GCMHydChH0nU%2Bly%2F6zPMUh0Kayn80lKFXuTSgQRHFxNqxSZa9saptLYSqgez6W9p%2Fv0DDxupAlseH%2F1YTS96sDyF5T6%2FxyOfQpOu8lQgkKu1INEybLYZctcfiGtH00iIiGMJGF1pwGOrICWSzci1woUM%2FpsHGqj4IARuZwfacVvL8ErhZIGOt89jcqIzxSyxftU6gHEGlJFQo7tSAGWz0XvZ5RszeMekEBxGg3Y%2Bls9VzPkupjaB1VeQfHKATg6goFSJiMNckfE%2BZDuwTTXb0G8sJdYezt87d4XGCs4pIGgGk4jXEv%2FG1JzmJojoh5WjhxoZwnLp7CqCYsZ8kfIY4UzpgUwtNiXwgAYyE13QX3e7BJ%2FlRdinqfozdoxFCFm4lC2BAAR%2FhHqHtgH6AeIY4qWGv%2F3jkj0M6zUiV85tNE9vALzQTM4h2EBZejkqaB2fXbnCbQabxBfs4De45G4UFXS6OxYzy6HhjSis8nnMtyq25HE7Jys%2BpPlIeEOYKJC9SmbfreIHjnBXG4r9z2Bj421JCLG4axPnMvfMzJ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221211T135803Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA3YWMNQG4TDVFTZ75%2F20221211%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=55f098b94c093325f531d2c861a88f817c2aefd4e256ad6de03571f0f9b99c5d",
  },
];

const ComposeBgMusicIndex = () => {
  const [loading, setLoading] = useState(false);
  const [bgMusicInfo, setBgMusicInfo] = useState({
    input: "",
    output: "",
    measureCount: 5,
    errorMessage: "",
    promptChoice: promptList[0],
  });

  const handleChangeBgInfo = (key, val) => {
    if (key === "promptChoice") {
      setBgMusicInfo({
        ...bgMusicInfo,
        input: "",
        [key]: val,
      });
    } else {
      setBgMusicInfo({
        ...bgMusicInfo,
        [key]: val,
      });
    }
  };

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
          output: "../../../backend/" + data?.output_bg_music,
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
      link.setAttribute("download", "bg_music_output.mp3");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  console.log("bgMusicInfo", bgMusicInfo);

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
              <div className="cl-page-title">Create music</div>
              <div className="cl-form-input-title">Prompt choice</div>
              <div className="ca-choice-root">
                {promptList?.length > 0 &&
                  promptList.map((plc, ind) => {
                    return (
                      <div
                        key={ind}
                        className={
                          plc?.name === bgMusicInfo?.promptChoice?.name
                            ? "ca-choice-root-box-selected"
                            : "ca-choice-root-box"
                        }
                        onClick={() => handleChangeBgInfo("promptChoice", plc)}
                      >
                        {plc?.name}
                      </div>
                    );
                  })}
              </div>
              {bgMusicInfo?.promptChoice?.id === 2 ? (
                <div className="cl-form-input-group">
                  <select
                    value={bgMusicInfo?.input}
                    style={{ height: "4vh", width: "100%" }}
                    onChange={(e) =>
                      handleChangeBgInfo("input", e.target.value)
                    }
                  >
                    <option disabled value="">
                      Select an option
                    </option>
                    {exampleList.map((optionVal) => (
                      <option key={optionVal?.label} value={optionVal?.value}>
                        {optionVal?.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="cl-form-input-group">
                  <input type="file" onChange={onFileChange} />
                </div>
              )}
              <div className="cl-form-input-group">
                <div className="cl-form-input-title">Measure count</div>
                <div className="cl-form-input-subtitle">
                  Line that describe what this slider does
                </div>
                <div className="cl-slider-root">
                  <div className="cl-slider-root-left">
                    <div class="slidecontainer">
                      <input
                        min="1"
                        max="5"
                        type="range"
                        class="slider"
                        value={bgMusicInfo?.measureCount}
                        onChange={(e) =>
                          handleChangeBgInfo("measureCount", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="cl-slider-root-right">
                    {bgMusicInfo?.measureCount}
                  </div>
                </div>
              </div>
              {bgMusicInfo?.errorMessage ? (
                <div className="cl-error">{bgMusicInfo?.errorMessage}</div>
              ) : null}
              <div
                className="cl-submit"
                onClick={() => handleGenerateBgMusic()}
              >
                Generate
              </div>
            </div>
            <div className="cl-right-root">
              <div className="cl-right-root-top">
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <audio id="player" controls>
                    <source type="audio/mp3" src={bgMusicInfo?.output} />
                  </audio>
                </div>
              </div>
              <div className="cl-right-root-bottom">
                <div
                  className="cl-right-root-bottom-copy"
                  onClick={() => handleDownloadBgMusic()}
                >
                  <img src={DownloadIcon} alt="Download" height="100%" />
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

export default ComposeBgMusicIndex;
