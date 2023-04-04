import React from "react";
import CinemaDetail from "./CinemaDetail/CinemaDetail";
import SubCinemaDetail from "./SubCinemaDetail/SubCinemaDetail";

export default function ScheduleFilmDetail() {
    return (
        <div className="container mx-auto my-5 " id='schedule-film-detail'>
            <div className="schedule flex flex-col md:flex-row shadow">
                <CinemaDetail/>
                <SubCinemaDetail/>
            </div>
        </div>
    );
}
