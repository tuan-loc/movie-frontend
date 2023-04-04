import { useFormik } from "formik";
import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { REGEX_ASCII } from "../../util/setting";
import { RegisterAction } from "../../redux/actions/UserAction";
import { NavLink } from "react-router-dom";
function RegisterForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP13",
      hoTen: "",
    },
    validationSchema: Yup.object({
      hoTen: Yup.string()
        .matches(REGEX_ASCII, "Họ tên phải dúng định dạng")
        .required("Không được bỏ trống"),
      taiKhoan: Yup.string().required("Không được bỏ trống"),
      matKhau: Yup.string().required("Không được bỏ trống"),
      email: Yup.string()
        .email("Không đúng định dạng email")
        .required("Không được bỏ trống"),
      soDt: Yup.number()
        .typeError("Chỉ có thể nhập số ")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const action = RegisterAction(values);
      dispatch(action);
    },
  });
  return (
    <form action="" onSubmit={formik.handleSubmit} className="account__form">
      <div>
        <p>Tên đăng nhập</p>
        <input
          type="text"
          className="form-control"
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
          <p className=" text-red-500">{formik.errors.taiKhoan}</p>
        ) : null}
      </div>
      <div>
        <p>Mật khẩu</p>
        <input
          name="matKhau"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.matKhau && formik.touched.matKhau ? (
          <p className=" text-red-500">{formik.errors.matKhau}</p>
        ) : null}
      </div>
      <div>
        <p>Nhập lại mật khẩu</p>
        <input
          name="nhapLaiMatKhau"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.values.matKhau !== formik.values.nhapLaiMatKhau ? (
          <p className=" text-red-500">Mật khẩu phải trùng nhau</p>
        ) : null}
      </div>
      <div>
        <p>Họ tên</p>
        <input
          name="hoTen"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.hoTen && formik.touched.hoTen ? (
          <p className=" text-red-500">{formik.errors.hoTen}</p>
        ) : null}
      </div>
      <div>
        <p>Email</p>
        <input
          name="email"
          type="email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className=" text-red-500">{formik.errors.email}</p>
        ) : null}
      </div>
      <div>
        <p>Số điện thoại</p>
        <input
          name="soDt"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.soDt && formik.touched.soDt ? (
          <p className=" text-red-500">{formik.errors.soDt}</p>
        ) : null}
      </div>
      <br />
      <button className="btn-login bg-red-600 font-bold rounded-md py-1 px-3  hover:bg-red-700">
        Đăng ký
      </button>
      <p className=" mb-0 mt-3">
        Đã có tài khoản?{" "}
        <NavLink
          to="/login"
          className="text-white hover:text-red-600 font-bold"
        >
          Đăng nhập
        </NavLink>
      </p>
    </form>
  );
}

export default memo(RegisterForm);
