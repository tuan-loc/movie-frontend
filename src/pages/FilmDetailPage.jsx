import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FilmDetail from "../components/FilmDetail/FilmDetail";
import ScheduleFilmDetail from "../components/ScheduleFilmDetail/ScheduleFilmDetail";
import { GetFilmByIdAction } from "../redux/actions/FilmAction";
import { DONE_LOADING, START_LOADING } from "../redux/types/LoadingType";

export default function FilmDetailPage(props) {
  const { filmChoice } = useSelector((state) => state.FilmReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = GetFilmByIdAction(props.match.params.id);
    dispatch(action);
  }, []);
  useEffect(() => {
    document.title = filmChoice.tenPhim;
  }, [filmChoice.tenPhim]);
  return (
    <>
      <FilmDetail></FilmDetail>
      <ScheduleFilmDetail></ScheduleFilmDetail>
    </>
  );
}
