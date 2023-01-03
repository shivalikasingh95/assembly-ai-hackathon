import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const dashboardMenus = [
  {
    link: "/compose-lyric",
    text: "Compose Lyrics.",
    image: "https://i.scdn.co/image/ab671c3d0000f430678067184805befd38aa0f57",
    description:
      "Express your creativity and we'll help you write songs that you love and enjoy.",
  },
  {
    link: "/compose-album",
    text: "Create Album Cover.",
    image: "https://i.scdn.co/image/ab671c3d0000f430a6f822749d5c25c32ee31d66",
    description:
      "Add some colour and life to your music and create some eye-catchy album art.",
  },
  {
    link: "/compose-bgmusic",
    text: "Compose Music.",
    image: "https://i.scdn.co/image/ab671c3d0000f430eb43023b5332389f5094530d",
    description:
      "Experiencing a creative block? We have a fix for that too. Let us help you compose your tunes.",
  },
];

const DashboardIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-index-root">
      {dashboardMenus &&
        dashboardMenus.map((menu, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(menu?.link)}
              className="dashboard-index-box-root"
            >
              <div className="dashboard-index-box-image">
                <img src={menu?.image} />
              </div>
              <div className="dashboard-index-box-content">
                <div className="dashboard-index-box-content-text">
                  {menu?.text}
                </div>
                <div className="dashboard-index-box-content-description">
                  {menu?.description}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DashboardIndex;
