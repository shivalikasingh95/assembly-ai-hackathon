import "../App.css";
import React from "react";

const SkeletonLoadingAlbum = () => {
  return (
    <a class="card" id="card-link" target="_blank">
      <div class="card__header">
        <div>
          <img class="card__header header__img skeleton" id="logo-img" alt="" />
        </div>
        <h3 class="card__header header__title ca-image-root" id="card-title">
          {/* <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div> */}
          <div className="skeleton skeleton-image-root-box">
          </div>
          <div className="skeleton skeleton-image-root-box"></div>
          <div className="skeleton skeleton-image-root-box"></div>
          <div className="skeleton skeleton-image-root-box"></div>
        </h3>
      </div>

      <div class="card__body">
        <div class="card__body body__text" id="card-details">
          <div class="skeleton skeleton-text skeleton-text__body"></div>
        </div>

        <div class="card__body body__img">
          <img class="skeleton" alt="" id="cover-img" />
        </div>
      </div>

      <div class="card__footer" id="card-footer">
        <div class="skeleton skeleton-text skeleton-footer"></div>
      </div>
    </a>
  );
};

export default SkeletonLoadingAlbum;
