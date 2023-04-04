import React, {useEffect, useState} from "react";
import {DatePicker, Form, Input, Rate, Switch} from "antd";
import {useFormik} from "formik";
import moment from "moment";
import * as Yup from "yup";
import {GROUP_ID, REGEX_URL} from "../../util/setting";
import {EditFilmAction,} from "../../redux/actions/FilmAction";
import {useDispatch, useSelector} from "react-redux";

const {TextArea} = Input;
export default function EditFilmPage() {
    const dispatch = useDispatch();
    const {filmChoice} = useSelector((state) => state.FilmReducer);
    const [componentSize, setComponentSize] = useState("default");
    const [imgSrc, setImgSrc] = useState("");
    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };
    const [film, setFilm] = useState({});
    useEffect(() => {
        setFilm(filmChoice);
        setImgSrc(filmChoice.hinhAnh);
    }, [filmChoice]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: film.maPhim,
            tenPhim: film.tenPhim,
            trailer: film.trailer,
            moTa: film.moTa,
            ngayKhoiChieu: film.ngayKhoiChieu
                ? moment(film.ngayKhoiChieu).format("DD/MM/YYYY")
                : moment(Date.now()).format("DD/MM/YYYY"),
            dangChieu: film.dangChieu,
            sapChieu: film.sapChieu,
            hot: film.hot,
            danhGia: film.danhGia,
            hinhAnh: null,
            maNhom: GROUP_ID,
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required("Không được bỏ trống"),
            trailer: Yup.string()
                .required("Không được bỏ trống")
                .matches(REGEX_URL, "Phải đúng định dạng URL"),
            moTa: Yup.string().required("Không được bỏ trống"),
        }),
        onSubmit: (values) => {
            // Tạo đối tượng formData
            let formData = new FormData();
            for (let key in values)
                if (key !== "hinhAnh") formData.append(key, values[key]);
            if (typeof values.hinhAnh !== "string" && values.hinhAnh !== null)
                formData.append(
                    "hinhAnh",
                    formik.values.hinhAnh,
                    formik.values.hinhAnh.name
                );
            const action = EditFilmAction(formData, values);
            dispatch(action);
        },
    });
    const handleChangeDatePicker = (value) => {
        formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));
    };
    const handleChangeSwitch = (name) => {
        return (value) => formik.setFieldValue(name, value);
    };
    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        // ? Tạo đối tượng để đọc file
        await formik.setFieldValue("hinhAnh", file);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImgSrc(e.target.result);
        };
    };
    return (
        <>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Tên phim">
                    <Input
                        value={formik.values.tenPhim}
                        name="tenPhim"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <p className=" bg-red-200 m-0">{formik.errors.tenPhim}</p>
          ) : null} */}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input
                        value={formik.values.trailer}
                        name="trailer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.trailer && formik.errors.trailer ? (
                        <p className=" bg-red-200 m-0">{formik.errors.trailer}</p>
                    ) : null}
                </Form.Item>
                <Form.Item label="Mô tả">
                    <TextArea
                        value={formik.values.moTa}
                        rows={4}
                        name="moTa"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.moTa && formik.errors.moTa ? (
                        <p className=" bg-red-200 m-0">{formik.errors.moTa}</p>
                    ) : null}
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker
                        format="DD/MM/YYYY"
                        onChange={handleChangeDatePicker}
                        allowClear={false}
                        value={moment(formik.values.ngayKhoiChieu, "DD/MM/YYYY")}
                    />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch
                        onChange={handleChangeSwitch("dangChieu")}
                        checked={formik.values.dangChieu}
                    />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch
                        onChange={handleChangeSwitch("sapChieu")}
                        checked={formik.values.sapChieu}
                    />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch
                        onChange={handleChangeSwitch("hot")}
                        checked={formik.values.hot}
                    />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <Rate
                        allowHalf
                        value={formik.values.danhGia}
                        count="10"
                        onChange={handleChangeSwitch("danhGia")}
                    />
                    <span className="ml-3">{formik.values.danhGia}</span>
                </Form.Item>
                <Form.Item label="Hình Ảnh">
                    <input
                        type="file"
                        onChange={handleChangeFile}
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                    />
                    {imgSrc !== "" ? (
                        <img src={imgSrc} alt="" style={{width: 150, height: 200}}/>
                    ) : null}
                    {formik.values.hinhAnh && imgSrc === "" ? (
                        <img
                            src={formik.values.hinhAnh}
                            alt=""
                            style={{width: 150, height: 200}}
                        />
                    ) : null}
                </Form.Item>
                <Form.Item className="justify-center items-center">
                    <div className="flex flex-row justify-center items-center">
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 hover:text-white rounded-md px-2 py-2 mx-2 "
                            type="submit"
                        >
                            Chỉnh sửa
                        </button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
}
