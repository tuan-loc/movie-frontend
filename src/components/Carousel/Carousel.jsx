import React, { Fragment, memo, useEffect } from "react";
import Slider from "react-slick";
import "./Carousel.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBannerAction,
  ToggleTrailerAction,
  GetFilmByIdAction,
} from "../../redux/actions/FilmAction";
import Trailer from "../Trailer/Trailer";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <i
      className="carousel__button prev-arrow fas fa-chevron-left"
      onClick={onClick}
    ></i>
  );
};
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <i
      className="carousel__button next-arrow fas fa-chevron-right"
      onClick={onClick}
    ></i>
  );
};
function Carousel(props) {
  const { arrBanner } = useSelector((state) => state.FilmReducer);
  const dispatch = useDispatch();
  const getBannerAction = GetBannerAction();
  const toggleTrailerAction = ToggleTrailerAction(true);
  useEffect(() => {
    dispatch(getBannerAction);
  }, []);
  const renderCarousel = () => {
    return arrBanner.map((film, index) => {
      return (
        <div
          className="carousel__item cursor-pointer"
          onClick={async () => {
            const chooseFilmAction = GetFilmByIdAction(film.maPhim);
            await dispatch(chooseFilmAction);
            await dispatch(toggleTrailerAction);
          }}
          key={index}
        >
          <div className="overlay"></div>
          <img
            src={film?.hinhAnh}
            alt="Banner Film"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://picsum.photos/1920/1080?random=${index}`;
            }}
            className="carousel__item"
          />
          <div className="carousel__play">
            <i className="fa fa-play"></i>
          </div>
        </div>
      );
    });
  };
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Fragment>
      <Slider {...settings}>{renderCarousel()}</Slider>
      <Trailer></Trailer>
    </Fragment>
  );
}

export default memo(Carousel);
