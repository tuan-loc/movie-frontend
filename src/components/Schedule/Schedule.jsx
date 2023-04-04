import React from "react";
import Cinema from "./Cinema/Cinema";
import SubCinema from "./SubCinema/SubCinema";
import Film from "./Film/Film";
import "./Schedule.css";

export default function Schedule() {
  return (
    <div className="container mx-auto">
      <div className="schedule flex flex-col md:flex-row shadow">
        <Cinema />
        <SubCinema />
        <Film />
      </div>
    </div>
  );
}
