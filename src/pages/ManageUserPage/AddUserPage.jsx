import React from "react";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  GROUP_ID,
  REGEX_ASCII,
  REGEX_EMAIL,
  REGEX_PHONE_NUMBER_VIETNAM,
} from "../../util/setting";
import { useDispatch } from "react-redux";
import { AddUserAction } from "../../redux/actions/UserAction";

export default function AddUserPage() {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "KhachHang",
      maNhom: GROUP_ID,
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Không được bỏ trống"),
      hoTen: Yup.string()
        .required("Không được bỏ trống")
        .matches(REGEX_ASCII, "Họ tên phải đúng định dạng"),
      email: Yup.string()
        .required("Không được bỏ trống")
        .matches(REGEX_EMAIL, "Email phải đúng định dạng"),
      soDt: Yup.string()
        .required("Không được bỏ trống")
        .matches(
          REGEX_PHONE_NUMBER_VIETNAM,
          "Số điện thoại phải là số và có 10 ký tự"
        ),
      matKhau: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const action = AddUserAction(values);
      dispatch(action);
    },
  });
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
      >
        <Form.Item label="Tài khoản">
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
            <p className=" bg-red-200">{formik.errors.taiKhoan}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <p className=" bg-red-200">{formik.errors.matKhau}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hoTen && formik.errors.hoTen ? (
            <p className=" bg-red-200">{formik.errors.hoTen}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.soDt && formik.errors.soDt ? (
            <p className=" bg-red-200">{formik.errors.soDt}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className=" bg-red-200">{formik.errors.email}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Mã loại người dùng">
          <Select
            defaultValue={"KhachHang"}
            onChange={(value) => {
              formik.setFieldValue("maLoaiNguoiDung", value);
            }}
          >
            <Select.Option value="KhachHang">Khách Hàng</Select.Option>
            <Select.Option value="QuanTri">Quản trị</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className="items-center justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2 mx-auto block mt-2"
            type="submit"
          >
            Thêm người dùng
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
