import {ticketService} from "../../services/TicketService";
import {GET_FILM_TICKET} from "../types/TicketType";
import {message} from "antd";
import {history} from "../../App";

export const GetChairsAction = (maLichChieu) => {
    return dispatch => {
        let promise = ticketService.GetChairs(maLichChieu);
        promise.then(res => {
            dispatch({type: GET_FILM_TICKET, filmTicketData: res.data.content})
        })
        promise.catch(err => {
            console.log(err.response?.data)
        })
    }
}
export const BookingTicketAction = (thongTinDatVe) => {
    return dispatch => {
        let promise = ticketService.BookingTicket(thongTinDatVe);
        promise.then(res => {
            message.success('Đặt vé thành công!');
            setTimeout(() => {
                history.push('/');
            }, 2000)
        });
        promise.catch(err => console.log(err.response?.data))
    }
}