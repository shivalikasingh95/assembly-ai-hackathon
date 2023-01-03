import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LogoImg from "../images/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="app-header-logo">
        <img
          width="100%"
          src={LogoImg}
          alt="Music Note"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div>
        <Link className="app-header-link" to="/compose-lyric">
          Write lyrics
        </Link>
        <Link className="app-header-link" to="/compose-album">
          Make album art
        </Link>
        <Link className="app-header-link" to="/compose-bgmusic">
          Create music
        </Link>
      </div>
    </>
  );
};

export default Header;
