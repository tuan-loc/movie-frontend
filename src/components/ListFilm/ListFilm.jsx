import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ListFilm.css";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { GetListFilmAction } from "../../redux/actions/FilmAction";
import Trailer from "../Trailer/Trailer";

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <i
      className={"list__button prev-arrow fas fa-chevron-left"}
      onClick={onClick}
    ></i>
  );
}

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <i
      className={"list__button next-arrow fas fa-chevron-right"}
      onClick={onClick}
    ></i>
  );
}

export default function ListFilm() {
  const [openTab, setOpenTab] = useState(1);
  const { arrFilm } = useSelector((state) => state.FilmReducer);
  const dispatch = useDispatch();
  const action = GetListFilmAction();
  const arrComingSoon = arrFilm.filter((film) => !film.dangChieu);
  const arrBlockBuster = arrFilm.filter((film) => film.hot);
  const arrNowShowing = arrFilm.filter((film) => film.dangChieu);

  let count = 4;
  if (window.innerWidth <= 375) count = 1;
  else if (window.innerWidth <= 640) count = 2;
  else if (window.innerWidth <= 768) count = 3;
  else if (window.innerWidth <= 1024) count = 4;

  const [col, setCol] = useState(count);

  useEffect(() => {
    dispatch(action);
  }, []);

  window.onresize = () => {
    if (window.innerWidth <= 375) setCol(1);
    else if (window.innerWidth <= 640) setCol(2);
    else if (window.innerWidth <= 768) setCol(3);
    else if (window.innerWidth <= 1024) setCol(4);
  };

  const settings = {
    slidesPerRow: col,
    rows: 2,
    slideToShow: col,
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const renderFilm = (arrF) => {
    // Thêm thẻ onClick cho thẻ i để chuyển qua trang chi tiết phim, gửi kèm id phim

    return arrF.map((film, index) => {
      return (
        <div key={index} className="text-center">
          <div className="card">
            <NavLink
              className="card__film"
              to={`/detail/${film.maPhim}/${film.tenPhim}`}
            >
              <img
                src={film.hinhAnh}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://picsum.photos/150/200?random=${index}`;
                }}
                alt="Film"
                className="list__item__img"
              />
              <div className="film__overlay rounded-lg">
                <i className="fa fa-play"></i>
              </div>
              <div className="card-body">
                <h4 className="h-5 text-left mx-auto mt-2 md:w-36 font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {film.tenPhim}
                </h4>
                <p className="text-right text-yellow-500 font-bold">
                  {film.danhGia}/10
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 md:flex-row flex-col md:h-20 h-48"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "tabLink text-lg hover:text-xl hover:text-gray-900 font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-red-600 text-xl"
                    : "text-gray-900 bg-white text-md")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Phim đang chiếu
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "tabLink text-lg hover:text-xl hover:text-gray-900 font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-red-600 text-xl"
                    : "text-gray-900 bg-white text-md")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Phim sắp chiếu
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "tabLink text-lg hover:text-xl hover:text-gray-900 font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-red-600 text-xl"
                    : "text-gray-900 bg-white text-md")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Phim hot nhất
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <Slider {...settings}>{renderFilm(arrNowShowing)}</Slider>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <Slider {...settings}>{renderFilm(arrComingSoon)}</Slider>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <Slider {...settings}>{renderFilm(arrBlockBuster)}</Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Trailer></Trailer>
    </>
  );
}
