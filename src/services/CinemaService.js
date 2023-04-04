import { http } from "../util/setting";

class CinemaService {
  GetCinema() {
    return http.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  }
  GetSubCinema(maRap) {
    return http.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`
    );
  }
}
export const cinemaService = new CinemaService();
