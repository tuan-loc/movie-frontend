import {http} from "../util/setting"

class TicketService {
    CreateShowTime(thongTinLichChieu) {
        return http.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
    }

    GetChairs(maLichChieu) {
        return http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    BookingTicket(thongTinDatVe) {
        return http.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe)
    }
}

export const ticketService = new TicketService();
