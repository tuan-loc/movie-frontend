import React from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { LoginAction } from "../../redux/actions/UserAction";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Không được bỏ trống"),
      matKhau: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const action = LoginAction(values);
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
          type="password"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.matKhau && formik.touched.matKhau ? (
          <p className=" text-red-500">{formik.errors.matKhau}</p>
        ) : null}
      </div>
      <NavLink to="/forgot-password" className="text-right font-bold">
        Quên mật khẩu
      </NavLink>
      <br />
      <button
        className="btn-login bg-red-600 font-bold rounded-md py-1 px-3 mt-3 hover:bg-red-700"
        type="submit"
      >
        Đăng nhập
      </button>
      <p className="mt-3">
        Chưa có tài khoản?
        <NavLink
          to="/register"
          className="text-red-600 font-bold hover:text-white ml-1"
        >
          Đăng ký
        </NavLink>
      </p>
    </form>
  );
}
