import React from "react";
import "./NotFoundPage.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { DONE_LOADING, START_LOADING } from "../../redux/types/LoadingType";
import { useDispatch } from "react-redux";
export default function NotFoundPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Movie";
    setTimeout(() => {
      dispatch({ type: DONE_LOADING });
    }, 1000);
    dispatch({ type: START_LOADING });
  }, []);
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <NavLink to="/">Go To Homepage</NavLink>
      </div>
    </div>
  );
}
