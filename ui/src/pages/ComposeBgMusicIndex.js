import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

import { postBgMusic } from "../api/api";
import { override } from "../api/apiLoading";

const bgMusicS3Urls = [
  {
    label: "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/bach.mp3",
    value: "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/bach.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCmFwLXNvdXRoLTEiSDBGAiEA7OnAleLVS%2Bdb7nxt5bBrhOXxZap2HQ4XZCFfO50FknwCIQC5q8PudLTKjJlcuzdhp4yAEraWyqGDJ8nuNySIBOz4LyrtAgiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDgwODk1NjI5NzY1NyIMNtGsN3FC2gjRdsH5KsECH9KPrl4yTChCvEhf1mNc3xQ7m86hCzQoeapbE7p03b8tapgzKv1AE7kGLr%2Fhhe4nY02ycAXWR2ic27SM%2BeVnEIG18Z5DcksYt02yuaSMkKMG5%2BPhyP%2F7h1fbje9y2UudwmcKOM8ZFpmZNjZNH6tFsjJwpK2fDJ3U8Ty7SqVyDoJasszShPLl%2FfElFIxRLtMqq2x6BZmbbu8%2FoedVsoKTze13d7PkNfu%2FJYoXGOPqc1H%2BHOjXsmrJD0S4%2BSKqkrnS3YSmWh4EFIYtjUed2Cj3D5jVS2XcGLsJfwQ2CykGD7GCMHydChH0nU%2Bly%2F6zPMUh0Kayn80lKFXuTSgQRHFxNqxSZa9saptLYSqgez6W9p%2Fv0DDxupAlseH%2F1YTS96sDyF5T6%2FxyOfQpOu8lQgkKu1INEybLYZctcfiGtH00iIiGMJGF1pwGOrICWSzci1woUM%2FpsHGqj4IARuZwfacVvL8ErhZIGOt89jcqIzxSyxftU6gHEGlJFQo7tSAGWz0XvZ5RszeMekEBxGg3Y%2Bls9VzPkupjaB1VeQfHKATg6goFSJiMNckfE%2BZDuwTTXb0G8sJdYezt87d4XGCs4pIGgGk4jXEv%2FG1JzmJojoh5WjhxoZwnLp7CqCYsZ8kfIY4UzpgUwtNiXwgAYyE13QX3e7BJ%2FlRdinqfozdoxFCFm4lC2BAAR%2FhHqHtgH6AeIY4qWGv%2F3jkj0M6zUiV85tNE9vALzQTM4h2EBZejkqaB2fXbnCbQabxBfs4De45G4UFXS6OxYzy6HhjSis8nnMtyq25HE7Jys%2BpPlIeEOYKJC9SmbfreIHjnBXG4r9z2Bj421JCLG4axPnMvfMzJ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221211T135803Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA3YWMNQG4TDVFTZ75%2F20221211%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=55f098b94c093325f531d2c861a88f817c2aefd4e256ad6de03571f0f9b99c5d"
  },
  {
    label: "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/prime_53.mp3",
    value: "https://assemblyai-hackathon.s3.ap-south-1.amazonaws.com/prime_53.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCmFwLXNvdXRoLTEiSDBGAiEA7OnAleLVS%2Bdb7nxt5bBrhOXxZap2HQ4XZCFfO50FknwCIQC5q8PudLTKjJlcuzdhp4yAEraWyqGDJ8nuNySIBOz4LyrtAgiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDgwODk1NjI5NzY1NyIMNtGsN3FC2gjRdsH5KsECH9KPrl4yTChCvEhf1mNc3xQ7m86hCzQoeapbE7p03b8tapgzKv1AE7kGLr%2Fhhe4nY02ycAXWR2ic27SM%2BeVnEIG18Z5DcksYt02yuaSMkKMG5%2BPhyP%2F7h1fbje9y2UudwmcKOM8ZFpmZNjZNH6tFsjJwpK2fDJ3U8Ty7SqVyDoJasszShPLl%2FfElFIxRLtMqq2x6BZmbbu8%2FoedVsoKTze13d7PkNfu%2FJYoXGOPqc1H%2BHOjXsmrJD0S4%2BSKqkrnS3YSmWh4EFIYtjUed2Cj3D5jVS2XcGLsJfwQ2CykGD7GCMHydChH0nU%2Bly%2F6zPMUh0Kayn80lKFXuTSgQRHFxNqxSZa9saptLYSqgez6W9p%2Fv0DDxupAlseH%2F1YTS96sDyF5T6%2FxyOfQpOu8lQgkKu1INEybLYZctcfiGtH00iIiGMJGF1pwGOrICWSzci1woUM%2FpsHGqj4IARuZwfacVvL8ErhZIGOt89jcqIzxSyxftU6gHEGlJFQo7tSAGWz0XvZ5RszeMekEBxGg3Y%2Bls9VzPkupjaB1VeQfHKATg6goFSJiMNckfE%2BZDuwTTXb0G8sJdYezt87d4XGCs4pIGgGk4jXEv%2FG1JzmJojoh5WjhxoZwnLp7CqCYsZ8kfIY4UzpgUwtNiXwgAYyE13QX3e7BJ%2FlRdinqfozdoxFCFm4lC2BAAR%2FhHqHtgH6AeIY4qWGv%2F3jkj0M6zUiV85tNE9vALzQTM4h2EBZejkqaB2fXbnCbQabxBfs4De45G4UFXS6OxYzy6HhjSis8nnMtyq25HE7Jys%2BpPlIeEOYKJC9SmbfreIHjnBXG4r9z2Bj421JCLG4axPnMvfMzJ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221211T135803Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA3YWMNQG4TDVFTZ75%2F20221211%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=55f098b94c093325f531d2c861a88f817c2aefd4e256ad6de03571f0f9b99c5d"
  }
];

const ComposeBgMusicIndex = () => {
  const [loading, setLoading] = useState(false);
  const [bgMusicInfo, setBgMusicInfo] = useState({
    type: "file",
    input: "",
    output: "",
    errorMessage: "",
  });

  const handleTypeChange = (e) => {
    setBgMusicInfo({
      ...bgMusicInfo,
      input: "",
      type: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setBgMusicInfo({
      ...bgMusicInfo,
      input: e.target.value,
    });
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
          output: "../../../backend/"+data?.output_bg_music,
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

  console.log("", bgMusicInfo);

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
            {/* <div className="compose-bgmusic-radioContainer">
              <div className="radio">
                <label>
                  <input
                    value="s3"
                    type="radio"
                    onChange={handleTypeChange}
                    checked={bgMusicInfo?.type === "s3"}
                  />
                  S3 url
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="file"
                    onChange={handleTypeChange}
                    checked={bgMusicInfo?.type === "file"}
                  />
                  Upload from local file system
                </label>
              </div>
            </div> */}
            <div className="compose-bgmusic-inputContainer">
              <div className="compose-bgmusic-heading">
                Background Music Prompt*
              </div>
              {/* {bgMusicInfo?.type === "s3" ? (
                <select
                  value={bgMusicInfo?.input}
                  onChange={handleSelectChange}
                  style={{ height: "45px", width: "30%" }}
                >
                  <option disabled value="">
                    Select an option
                  </option>
                  {bgMusicS3Urls.map((optionVal) => (
                    <option key={optionVal?.label} value={optionVal?.value}>
                      {optionVal?.label}
                    </option>
                  ))}
                </select>
              ) : null} */}
              {bgMusicInfo?.type === "file" ? (
                <input type="file" onChange={onFileChange} />
              ) : null}
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
