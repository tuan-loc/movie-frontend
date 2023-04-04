import React, {useState} from "react";
import {DatePicker, Form, Input, Rate, Switch} from "antd";
import {useFormik} from "formik";
import moment from "moment";
import * as Yup from "yup";
import {GROUP_ID, REGEX_URL} from "../../util/setting";
import {AddFilmAction, CloseAdminModelAction} from "../../redux/actions/FilmAction";
import {useDispatch} from "react-redux";

const {TextArea} = Input;
export default function AddFilmPage() {
    const dispatch = useDispatch();
    const [componentSize, setComponentSize] = useState("default");
    const [imgSrc, setImgSrc] = useState("");
    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            ngayKhoiChieu: moment(Date.now()).format("DD/MM/YYYY"),
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
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
            formData.append(
                "hinhAnh",
                formik.values.hinhAnh,
                formik.values.hinhAnh.name
            );
            const action = AddFilmAction(formData, values);
            dispatch(action);
            const closeModalAction = CloseAdminModelAction();
            dispatch(closeModalAction())
        },
    });
    const handleChangeDatePicker = (value) => {
        formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));
    };
    const handleChangeSwitch = (name) => {
        return (value) => formik.setFieldValue(name, value);
    };
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        formik.setFieldValue("hinhAnh", file);

        // ? Tạo đối tượng để đọc file
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
                        name="tenPhim"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.tenPhim && formik.errors.tenPhim ? (
                        <p className=" bg-red-200 m-0">{formik.errors.tenPhim}</p>
                    ) : null}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input
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
                        defaultValue={moment(
                            moment(Date.now()).format("DD/MM/YYYY"),
                            "DD/MM/YYYY"
                        )}
                    />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch("dangChieu")}/>
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch("sapChieu")}/>
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch("hot")}/>
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <Rate
                        allowHalf
                        defaultValue={0}
                        count="10"
                        onChange={handleChangeSwitch("danhGia")}
                    />
                    <span className="ml-3">{formik.values.danhGia}</span>
                </Form.Item>
                <Form.Item label="Hình Ảnh">
                    <input
                        type="file"
                        onChange={handleChangeFile}
                        accept="image/png, image/jpg, image/gif"
                    />
                    {imgSrc !== "" ? (
                        <img src={imgSrc} alt="" style={{width: 150, height: 200}}/>
                    ) : null}
                </Form.Item>
                <Form.Item label="" className="justify-center items-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-1 py-2 text-center mx-auto block"
                        type="submit"
                    >
                        Thêm phim
                    </button>
                </Form.Item>
            </Form>
        </>
    );
}
