/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_FILM,
  CLOSE_ADMIN_MODEL,
  DELETE_FILM,
  EDIT_FILM,
  OPEN_ADMIN_MODEL,
} from "../types/AdminType";
import {
  GET_FILMS,
  GET_BANNERS,
  GET_FILMS_OF_CINEMA,
  GET_FILM_BY_ID,
  TOGGLE_TRAILER,
  GET_SCHEDULE_OF_FILM,
} from "../types/FilmType";

const initialState = {
  arrBanner: [],
  arrFilm: [],
  arrFilmsOfCinema: [],
  filmChoice: {},
  viewTrailer: false,
  filmDetail: {},
  openModal: false,
  componentType: "AddFilm",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILMS: {
      state.arrFilm = action.arrFilm;
      return { ...state };
    }
    case GET_BANNERS: {
      state.arrBanner = action.arrBanner;
      return { ...state };
    }
    case GET_FILMS_OF_CINEMA: {
      state.arrFilmsOfCinema = action.arrFilmsOfCinema;
      return { ...state };
    }
    case GET_FILM_BY_ID: {
      state.filmChoice = action.filmChoice;
      return { ...state };
    }
    case TOGGLE_TRAILER: {
      state.viewTrailer = action.bool;
      return { ...state };
    }
    case GET_SCHEDULE_OF_FILM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }
    case ADD_FILM: {
      state.arrFilm.push(action.film);
      return { ...state };
    }
    case EDIT_FILM: {
      console.log(action.film.maPhim);
      const arrFilmUpdate = [...state.arrFilm].filter(
        (film) => film.maPhim !== action.film.maPhim
      );
      arrFilmUpdate.push(action.film);
      state.arrFilm = arrFilmUpdate;
      return { ...state };
    }
    case DELETE_FILM: {
      let filmsUpdate = [...state.arrFilm].filter(
        (film) => film.maPhim !== action.maPhim
      );
      state.arrFilm = filmsUpdate;
      return { ...state };
    }
    case OPEN_ADMIN_MODEL: {
      return {
        ...state,
        openModal: true,
        componentType: action.componentType,
        filmChoice: action.film,
      };
    }
    case CLOSE_ADMIN_MODEL: {
      return { ...state, openModal: false, filmChoice: {} };
    }
    default:
      return { ...state };
  }
};
