import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCinemaAction } from "../../../redux/actions/CinemaAction";
import { CHOOSE_CINEMA } from "../../../redux/types/CinemaType";
import "./CinemaDetail.css";
import _ from "lodash";

function Cinema(props) {
  const { arrCinema, cinemaChoice } = useSelector(
    (state) => state.CinemaReducer
  );
  const action = GetCinemaAction();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action);
  }, []);
  const renderCinemas = () => {
    return arrCinema.map((cinema, i) => {
      return (
        <li
          className={
            "md:p-5 p-3 rounded-t-lg md:rounded-t-none md:rounded-l-lg border-l border-r md:border-l-0 md:border-r-0 md:border-t md:border-b border-opacity-50" +
            (cinemaChoice === i ? " bg-red-600" : " bg-white")
          }
          key={i}
        >
          <a
            onClick={() => dispatch({ type: CHOOSE_CINEMA, cinemaChoice: i })}
            className="flex flex-nowrap items-center content-center flex-col md:flex-row"
          >
            <img
              src={cinema.logo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/200";
              }}
              alt=""
              className="rounded-full"
            />
            <p
              className={
                " mt-2 md:mt-0 md:ml-3 mb-0 font-bold text-sm text-center md:text-left" +
                (cinemaChoice === i ? " text-white" : " text-gray-900")
              }
            >
              {_.startCase(_.toLower(cinema.tenHeThongRap))}
            </p>
          </a>
        </li>
      );
    });
  };
  return (
    <div className="cinemaListDetail">
      <ul className="list-none flex flex-row md:flex-col w-1/6 overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll">
        {renderCinemas()}
      </ul>
    </div>
  );
}
export default memo(Cinema);
