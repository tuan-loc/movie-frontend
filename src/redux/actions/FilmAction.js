import {
  GET_FILMS,
  GET_BANNERS,
  GET_FILM_BY_ID,
  TOGGLE_TRAILER,
  GET_FILMS_OF_CINEMA,
  GET_SCHEDULE_OF_FILM,
} from "../types/FilmType";
import { filmService } from "../../services/FilmService";
import {
  ADD_FILM,
  CLOSE_ADMIN_MODEL,
  DELETE_FILM,
  EDIT_FILM,
  OPEN_ADMIN_MODEL,
} from "../types/AdminType";
import { message } from "antd";

export const GetListFilmAction = (tenPhim = "") => {
  return (dispatch) => {
    let promise = filmService.GetListFilm(tenPhim);
    promise.then((result) => {
      dispatch({ type: GET_FILMS, arrFilm: result.data.content });
    });
    promise.catch((err) => {
      console.log(err);
    });
  };
};

export const GetBannerAction = () => {
  return (dispatch) => {
    let promise = filmService.GetBanner();
    promise
      .then((result) => {
        dispatch({ type: GET_BANNERS, arrBanner: result.data.content });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const GetFilmByIdAction = (id) => {
  return (dispatch) => {
    let promise = filmService.GetFilmById(id);
    promise.then((result) => {
      dispatch({ type: GET_FILM_BY_ID, filmChoice: result.data.content });
    });
    promise.catch((err) => {
      console.log(err);
    });
  };
};

export const GetFilmOfCinemaAction = (maRap = "BHDStar") => {
  return (dispatch) => {
    let promise = filmService.GetFilmOfCinema(maRap);
    promise.then((result) => {
      dispatch({
        type: GET_FILMS_OF_CINEMA,
        arrFilmsOfCinema: result.data.content,
      });
    });
    promise.catch((err) => {
      console.log(err.response?.data);
    });
  };
};

export const GetScheduleOfFilmAction = (maPhim) => {
  return (dispatch) => {
    let promise = filmService.GetScheduleOfFilm(maPhim);
    promise.then((result) => {
      dispatch({
        type: GET_SCHEDULE_OF_FILM,
        filmDetail: result.data.content,
      });
    });
    promise.catch((err) => {
      console.log(err);
    });
  };
};

export const ToggleTrailerAction = (bool) => ({
  type: TOGGLE_TRAILER,
  bool,
});

export const OpenAdminModelAction = (componentType, film = {}) => {
  return (dispatch) => {
    dispatch({ type: OPEN_ADMIN_MODEL, componentType, film });
  };
};
export const CloseAdminModelAction = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_ADMIN_MODEL });
  };
};
export const AddFilmAction = (formData, film) => {
  return (dispatch) => {
    let promise = filmService.AddFilm(formData);
    promise.then((result) => {
      message.success("Thêm phim thành công!");
      dispatch({ type: ADD_FILM, film });
      dispatch({ type: CLOSE_ADMIN_MODEL });
    });
    promise.catch((err) => {
      message.error("Thêm phim thất bại!");
      console.log(err.response?.data);
    });
  };
};
export const EditFilmAction = (formData, film) => {
  return (dispatch) => {
    let promise = filmService.EditFilm(formData);
    promise.then((res) => {
      message.success("Chỉnh sửa phim thành công!");
      dispatch({ type: EDIT_FILM, film });
      dispatch({ type: CLOSE_ADMIN_MODEL });
    });
    promise.catch((err) => {
      message.error("Chỉnh sửa phim thất bại!");
      console.log(err);
    });
  };
};
export const DeleteFilmAction = (maPhim) => {
  return (dispatch) => {
    let promise = filmService.DeleteFilm(maPhim);
    promise.then((result) => {
      message.success("Xóa phim thành công!");
      dispatch({ type: DELETE_FILM, maPhim });
    });
    promise.catch((err) => {
      console.log(err);
    });
  };
};
