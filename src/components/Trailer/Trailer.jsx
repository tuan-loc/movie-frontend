import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleTrailerAction } from "../../redux/actions/FilmAction";
import { Modal } from "antd";

let height = 30;
function Trailer() {
  const { viewTrailer, filmChoice } = useSelector((state) => state.FilmReducer);
  const dispatch = useDispatch();
  const action = ToggleTrailerAction(false);
  useEffect(() => {
    window.onload = () => {
      if (window.innerWidth <= 375) height = 30;
      else if (window.innerWidth <= 475) height = 40;
      else if (window.innerWidth <= 768) height = 45;
      else if (window.innerWidth <= 1024) height = 50;
      else height = 70;
    };
    window.onresize = () => {
      if (window.innerWidth <= 375) height = 30;
      else if (window.innerWidth <= 475) height = 40;
      else if (window.innerWidth <= 768) height = 45;
      else if (window.innerWidth <= 1024) height = 50;
      else height = 70;
    };
  }, []);
  return (
    <Modal
      visible={viewTrailer}
      onOk={() => {
        dispatch(action);
      }}
      onCancel={() => {
        dispatch(action);
      }}
      footer={[]}
      width={"70%"}
    >
      <iframe
        className="w-full "
        style={{ height: `${height}vh` }}
        src={
          filmChoice?.trailer?.includes("http")
            ? filmChoice.trailer
            : "https://www.youtube.com/embed/eHsWYmnXk1o"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Modal>
  );
}

export default memo(Trailer);
