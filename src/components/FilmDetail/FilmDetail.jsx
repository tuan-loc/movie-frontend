import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "./FilmDetail.css";
import moment from "moment";
import Trailer from "../Trailer/Trailer";
import {ToggleTrailerAction} from "../../redux/actions/FilmAction";
import {Progress} from "antd";
import {CustomCard} from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";

export default function FilmDetail() {
    const {filmChoice} = useSelector((state) => state.FilmReducer);
    const dispatch = useDispatch();
    const toggleTrailerAction = ToggleTrailerAction(true);
    return (
        <>
            <div
                className="filmDetail"
                style={{
                    background: `url(${filmChoice.hinhAnh}), rgba(0,0,0,0.5)`,
                    backgroundBlendMode: "overlay",
                    padding: " 0",
                    overflow: "hidden",
                }}
            >
                <CustomCard
                    effectColor="#000"
                    color="#000"
                    blur={20}
                    borderRadius={-1}
                    className="w-screen grid grid-cols-1 sm:grid-cols-3 p-10 rounded-none"
                >
                    <img
                        src={filmChoice.hinhAnh}
                        alt=""
                        className=" h-80 w-56 mx-auto block rounded"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://picsum.photos/200/300";
                        }}
                    />
                    <div className="col-span-2 mt-4 md:mt-0 md:ml-5">
                        <h3 className="text-2xl text-white font-bold  xl:w-3/4">
                            {filmChoice.tenPhim}
                        </h3>
                        <p className="text-white opacity-75 xl:w-3/4">{filmChoice.moTa}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
                            <ul className="text-white mb-0 mt-5 col-span-2">
                                <li className="h-10">
                  <span className=" w-32 inline-block font-bold">
                    Ngày khởi chiếu
                  </span>
                                    <span>
                    {moment(filmChoice.ngayKhoiChieu).format("DD-MM-YYYY")}
                  </span>
                                </li>
                                <li className="">
                  <span className="filmDetail__button">
                    <button
                        className=" bg-red-600 hover:bg-red-700 p-2 my-2 w-32 mr-10 md:mr-5 text-center block rounded"
                        onClick={() => {
                            dispatch(toggleTrailerAction);
                        }}
                    >
                      Xem Trailer
                    </button>
                    <a href='#schedule-film-detail'
                       className="bg-red-600  text-white hover:text-white transition-all duration-300 hover:bg-red-700 p-2 w-32 my-2 text-center block rounded"
                    >
                      <i className="fas fa-ticket-alt inline-block mr-1"></i>
                      Mua vé ngay
                    </a>
                  </span>
                                </li>
                            </ul>
                            <Progress
                                className=" row-start-1 text-center md:col-start-3"
                                type="circle"
                                strokeColor={{
                                    "0%": "#fad541",
                                    "100%": "#fad541",
                                }}
                                percent={filmChoice.danhGia * 10}
                                format={(percent) => percent / 10}
                                strokeLinecap="square"
                            />
                        </div>
                    </div>
                </CustomCard>
                <Trailer></Trailer>
            </div>
        </>
    );
}
