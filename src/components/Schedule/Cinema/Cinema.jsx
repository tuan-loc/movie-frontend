import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCinemaAction } from "../../../redux/actions/CinemaAction";
import { CHOOSE_CINEMA } from "../../../redux/types/CinemaType";
import "./Cinema.css";

function Cinema(props) {
  const { arrCinema, cinemaChoice } = useSelector(
    (state) => state.CinemaReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const action = GetCinemaAction();
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
          <a onClick={() => dispatch({ type: CHOOSE_CINEMA, cinemaChoice: i })}>
            <img
              src={cinema.logo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/200";
              }}
              alt=""
              className="rounded-full"
            />
          </a>
        </li>
      );
    });
  };
  return (
    <div className="w-full cinemaList md:ml-3">
      <ul className="list-none flex flex-row md:flex-col w-1/6">
        {renderCinemas()}
      </ul>
    </div>
  );
}
export default memo(Cinema);
