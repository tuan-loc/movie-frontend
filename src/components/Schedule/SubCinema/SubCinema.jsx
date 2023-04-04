import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSubCinemaAction } from "../../../redux/actions/CinemaAction";
import { GetFilmOfCinemaAction } from "../../../redux/actions/FilmAction";
import { CHOOSE_SUB_CINEMA } from "../../../redux/types/CinemaType";
import "./SubCinema.css";

export default function SubCinema() {
  const { arrCinema, cinemaChoice, arrSubCinema, subCinemaChoice } =
    useSelector((state) => state.CinemaReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const action = GetSubCinemaAction();
    dispatch(action);
  }, []);
  useEffect(() => {
    if (arrCinema.length > 0) {
      const action = GetSubCinemaAction(arrCinema[cinemaChoice].maHeThongRap);
      dispatch(action);
    }
  }, [cinemaChoice]);

  const renderSubCinema = () => {
    return arrSubCinema.map((rap, i) => {
      return (
        <li
          className={
            "md:p-5 p-3 rounded-t-lg md:rounded-t-none md:rounded-l-lg border-l border-r md:border-l-0 md:border-r-0 md:border-t md:border-b border-opacity-50" +
            (subCinemaChoice === i ? " bg-red-600" : " bg-white")
          }
          key={i}
        >
          <a
            onClick={() =>
              dispatch({ type: CHOOSE_SUB_CINEMA, subCinemaChoice: i })
            }
            className="flex"
          >
            <div className="w-1/4">
              <img
                src="https://picsum.photos/200"
                alt=""
                className="rounded-full w-12"
              />
            </div>
            <div className="w-3/4">
              <h4
                className={
                  subCinemaChoice === i ? " text-white" : " text-gray-900"
                }
              >
                {rap.tenCumRap}
              </h4>
              <h5
                className={
                  subCinemaChoice === i ? " text-white" : " text-gray-900"
                }
              >
                {rap.diaChi}
              </h5>
            </div>
          </a>
        </li>
      );
    });
  };

  return (
    <div className="w-full subCinemaList">
      <ul className="list-none flex flex-row md:flex-col overflow-scroll">
        {renderSubCinema()}
      </ul>
    </div>
  );
}
