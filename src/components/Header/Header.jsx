import React, { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { USER_ACCOUNT } from "../../util/setting";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

function Header() {
  // use antd to create dropdown menu
  const [isLogin, setLogin] = useState(true);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/info">Thông tin cá nhân</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink
          to="/"
          onClick={() => {
            setLogin(false);
            localStorage.clear();
          }}
        >
          Đăng xuất
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [layout, setLayout] = useState(true);
  useEffect(() => {
    window.onload = () => {
      setNavbarOpen(false);
      window.innerWidth < 1024 ? setLayout(true) : setLayout(false);
    };
    window.onresize = () => {
      setNavbarOpen(false);
      window.innerWidth < 1024 ? setLayout(true) : setLayout(false);
    };
  }, [navbarOpen, layout]);
  return (
    <header className="header py-4 shadow-lg sticky z-50">
      <div className="px-4 mx-auto flex justify-between items-center flex-wrap">
        <div className={"flex items-center" + (layout ? " w-1/6" : " w-1/6")}>
          <NavLink to="/">
            <img src="./logo/web-logo.png" alt="" width="45" />
          </NavLink>
        </div>
        <div
          className="relative flex justify-end md:w-auto md:static md:block md:justify-start"
          style={navbarOpen ? { flexBasis: "60vw" } : {}}
        >
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars text-gray-900"></i>
          </button>
        </div>
        <div
          className={
            "w-5/6 md:flex flex-grow items-center mx-auto" +
            (navbarOpen ? " flex-col" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="w-4/5 flex m-0 mx-auto justify-center flex-col md:flex-row list-none md:ml-auto">
            <li
              className={
                "flex items-center justify-center" +
                (navbarOpen ? " border-none my-2" : " border-r-2")
              }
            >
              <NavLink className="header__navLink" to="/home">
                Trang chủ
              </NavLink>
            </li>
            <li
              className={
                "flex items-center justify-center" +
                (navbarOpen ? " border-none my-2" : " border-r-2")
              }
            >
              <a className="header__navLink" href="#contact">
                Liên hệ
              </a>
            </li>
            <li
              className={
                "flex items-center justify-center" +
                (navbarOpen ? " border-none my-2" : " border-r-2")
              }
            >
              <NavLink className="header__navLink" to="/news">
                Tin tức
              </NavLink>
            </li>
            <li
              className={
                "flex items-center justify-center " +
                (navbarOpen ? " border-none my-2" : "")
              }
            >
              <a className="header__navLink" href="#apps">
                Ứng dụng
              </a>
            </li>
          </ul>
          {localStorage.getItem(USER_ACCOUNT) ? (
            <div
              className={
                "relative text-center" +
                (navbarOpen
                  ? " mt-2 justify-center block items-center text-center"
                  : " w-1/5 justify-end inline-block")
              }
            >
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link text-base text-center font-bold text-gray-900 hover:text-red-600"
                  onClick={(e) => e.preventDefault()}
                >
                  Xin chào,{" "}
                  {JSON.parse(localStorage.getItem(USER_ACCOUNT)).hoTen}{" "}
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          ) : (
            <div
              className={
                "control flex flex-grow flex-wrap items-end" +
                (navbarOpen ? " mt-2 justify-center" : "  w-1/5  justify-end")
              }
            >
              <NavLink
                to="/register"
                className="header__btn mx-2 font-bold text-gray-900"
              >
                Đăng ký
              </NavLink>
              <NavLink
                to="/login"
                className="header__btn mx-2 font-bold text-gray-900"
              >
                Đăng nhập
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
