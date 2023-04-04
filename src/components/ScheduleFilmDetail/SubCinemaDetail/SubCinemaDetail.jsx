import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { GetScheduleOfFilmAction } from "../../../redux/actions/FilmAction";
import "./SubCinemaDetail.css";
export default function SubCinema() {
  const { filmChoice, filmDetail } = useSelector((state) => state.FilmReducer);
  const { arrCinema, cinemaChoice } = useSelector(
    (state) => state.CinemaReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const action = GetScheduleOfFilmAction(filmChoice.maPhim);
    dispatch(action);
  }, [filmChoice.maPhim]);
  const cinemaSystem = filmDetail?.heThongRapChieu;
  let index;
  if (arrCinema.length > 0) {
    index = cinemaSystem?.findIndex(
      (cinemas) =>
        cinemas.maHeThongRap === arrCinema[cinemaChoice]?.maHeThongRap
    );
  }
  const renderTime = (rap) => {
    return rap.lichChieuPhim.map((lichChieu, index) => {
      return (
        <div className="showtime px-2 text-center" key={index}>
          <NavLink
            to={`/booking-ticket/${lichChieu.maLichChieu}`}
            className="bg-red-600 rounded-md text-lg text-white py-0.5 cursor-pointer block hover:text-gray-300"
            key={index}
          >
            {moment(lichChieu.ngayChieuGioChieu).format("kk:mm")}
          </NavLink>
        </div>
      );
    });
  };

  const renderSubCinema = (arrRap) => {
    return arrRap?.map((rap, i) => {
      return (
        <li key={i} className="bg-white my-2 showtimeDetail">
          <div className="flex flex-col lg:flex-row">
            <div className=" flex md:w-96 pr-3">
              <img
                src={rap.hinhAnh}
                alt=""
                className=" rounded w-24 h-24 lg:w-32 lg:h-32 mx-2 "
              />
              <div className="">
                <h3>{rap.tenCumRap}</h3>
                <p className="text-gray-600">{rap.diaChi}</p>
              </div>
            </div>
            <div className=" grid grid-cols-4 lg:grid-cols-5 mt-3 lg:pl-3 ">
              {renderTime(rap)}
            </div>
          </div>
        </li>
      );
    });
  };
  if (index !== -1) {
    return (
      <ul className="md:w-5/6">
        <div className="w-full">
          <ul className="list-none flex flex-col overflow-scroll h-full">
            {renderSubCinema(cinemaSystem?.[index]?.cumRapChieu)}
          </ul>
        </div>
      </ul>
    );
  }
  return (
    <p className="text-lg md:w-5/6 pl-2">
      Hiện tại phim <span className="font-bold">{filmChoice.tenPhim}</span> ở
      cụm rạp{" "}
      <span className="font-bold">{arrCinema[cinemaChoice].tenHeThongRap}</span>{" "}
      không có lịch chiếu, vui lòng quay lại sau!
    </p>
  );
}
