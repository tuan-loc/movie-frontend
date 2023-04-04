import React, {useEffect, useState} from "react";
import {DatePicker, Form, InputNumber, message, Select, Space} from "antd";
import {cinemaService} from "../../services/CinemaService";
import _ from "lodash";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import moment from "moment";
import {ticketService} from "../../services/TicketService";

export default function AddShowTimePage(props) {
    const {filmChoice} = useSelector((state) => state.FilmReducer);
    const formik = useFormik({
        initialValues: {
            maPhim: filmChoice.maPhim,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: 75000,
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                const result = await ticketService.CreateShowTime(values);
                message.success("Tạo lịch chiếu thành công!");
            } catch (e) {
                message.error("Tạo lịch chiếu thất bại!");
                console.log(e.response?.data);
            }
        },
    });
    const [state, setState] = useState({
        arrCinema: [],
        arrSubCinema: [],
        arrSubSubCinema: [],
    });
    useEffect(async () => {
        try {
            let res = await cinemaService.GetCinema();
            setState({...state, arrCinema: res.data.content});
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleChangeCinema = async (value) => {
        try {
            const res = await cinemaService.GetSubCinema(value);
            setState({...state, arrSubCinema: res.data.content});
        } catch (e) {
            console.log(e);
        }
    };
    const handleChangeSubCinema = (value) => {
        formik.setFieldValue("maRap", value.toString());
    };

    const ticketPriceOnChange = (value) => {
        formik.setFieldValue("giaVe", value);
    };
    const datePickerOnChange = (value, dateString) => {
        formik.setFieldValue("ngayChieuGioChieu", dateString);
    };

    const datePickerOnOk = (value, dateString) => {
        formik.setFieldValue(
            "ngayChieuGioChieu",
            moment(value).format("DD/MM/YYYY hh:mm:ss")
        );
    };
    console.log(state.arrSubCinema);
    return (
        <>
            <div className="grid grid-cols-3 md:grid-cols-4">
                <div className="md:col-span-1 col-span-3 flex justify-center items-center flex-col">
                    <img
                        src={filmChoice.hinhAnh}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://picsum.photos/200/300";
                        }}
                        className="rounded"
                        width={170}
                        height={200}
                    />
                    <h3 className="text-lg mt-3 font-bold text-center">
                        {filmChoice.tenPhim}
                    </h3>
                </div>
                <Form
                    className="col-span-3 flex justify-center flex-col "
                    onSubmitCapture={formik.handleSubmit}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label="Hệ thống rạp">
                        <Select
                            options={state.arrCinema.map((cumRap, index) => ({
                                label: _.upperFirst(cumRap.tenHeThongRap),
                                value: cumRap.maHeThongRap,
                            }))}
                            placeholder="Chọn hệ thống rạp"
                            onChange={handleChangeCinema}
                        />
                    </Form.Item>
                    <Form.Item label="Cụm rạp">
                        <Select
                            options={state.arrSubCinema?.map((rap, index) => ({
                                label: rap.tenCumRap,
                                value: rap.maCumRap,
                            }))}
                            placeholder="Chọn cụm rạp"
                            onChange={handleChangeSubCinema}
                        />
                    </Form.Item>
                    <Form.Item label="Ngày chiếu giờ chiếu">
                        <Space direction="vertical" size={12}>
                            <DatePicker
                                format="DD/MM/YYYY hh:mm:ss"
                                showTime
                                onChange={datePickerOnChange}
                                onOk={datePickerOnOk}
                            />
                        </Space>
                        ,
                    </Form.Item>
                    <Form.Item label="Giá vé">
                        <InputNumber
                            min={50000}
                            max={150000}
                            defaultValue={75000}
                            step={1000}
                            onChange={ticketPriceOnChange}
                        />
                    </Form.Item>
                    <Form.Item label="" className="justify-center items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-2 text-center mx-auto block"
                            type="submit"
                        >
                            Tạo lịch chiếu
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}
