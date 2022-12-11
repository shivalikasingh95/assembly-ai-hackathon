import React from "react";
import { useNavigate } from "react-router-dom";

import MusicImg from "../images/music-note.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <img
        width="3%"
        src={MusicImg}
        alt="Music Note"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Chords & Art
      </div>
    </>
  );
};

export default Header;
