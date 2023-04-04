import React, { Fragment } from "react";
import Carousel from "../components/Carousel/Carousel";
import ListFilm from "../components/ListFilm/ListFilm";
import Schedule from "../components/Schedule/Schedule";
export default function HomePage(props) {
  return (
    <Fragment>
      <Carousel />
      <ListFilm />
      <Schedule />
    </Fragment>
  );
}
