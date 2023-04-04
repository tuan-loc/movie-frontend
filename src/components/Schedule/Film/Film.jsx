import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetFilmOfCinemaAction } from "../../../redux/actions/FilmAction";
import "./FilmSchedule.css";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function Film() {
  const { arrFilmsOfCinema } = useSelector((state) => state.FilmReducer);
  const { cinemaChoice, subCinemaChoice, arrSubCinema, arrCinema } =
    useSelector((state) => state.CinemaReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = GetFilmOfCinemaAction(arrCinema[cinemaChoice]?.maHeThongRap);
    dispatch(action);
  }, [cinemaChoice]);
  useEffect(() => {}, [subCinemaChoice]);

  const arrFilm = arrFilmsOfCinema[0]?.lstCumRap.filter(
    (rap) => rap.maCumRap === arrSubCinema[subCinemaChoice]?.maCumRap
  )[0]?.danhSachPhim;
  const renderTime = (film) => {
    const arrTime = film?.lstLichChieuTheoPhim;
    let timeSet = new Set();

    arrTime.forEach((time) => {
      timeSet.add(time.ngayChieuGioChieu);
    });

    let content = [],
      count = 0;
    for (let time of timeSet) {
      let timeFormated = moment(time).format("kk:mm");

      content.push(
        <div className="showtime w-1/3 lg:w-1/4 text-center px-2" key={count}>
          <p
            className="bg-red-600 rounded-md text-lg text-white py-0.5 mb-4"
            key={count}
          >
            {timeFormated}
          </p>
        </div>
      );
      count++;
      if (count > 6) break;
    }
    return content;
  };
  const renderFilm = () => {
    return arrFilm?.map((film, i) => {
      if (film.dangChieu || film.sapChieu) {
        return (
          <li key={i} className="bg-white">
            <NavLink
              to={`/detail/${film.maPhim}/${film.tenPhim}`}
              className="flex ml-2 schedule__film"
            >
              <img src={film.hinhAnh} alt="" className="w-1/5" />
              <div className="w-4/5 flex flex-col justify-between">
                <h3 className="pl-5 pr-5 text-right mt-4 text-2xl font-bold">
                  {film.tenPhim.length > 20
                    ? film.tenPhim.substring(0, 20) + "..."
                    : film.tenPhim}
                </h3>
                <div className="w-full flex flex-wrap self-center mb-5 justify-end">
                  {renderTime(film)}
                </div>
              </div>
            </NavLink>
          </li>
        );
      }
    });
  };
  return (
    <div className=" filmList">
      <ul className="list-none flex flex-col">{renderFilm()}</ul>
    </div>
  );
}
