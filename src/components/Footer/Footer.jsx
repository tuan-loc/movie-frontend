import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    // Chưa chỉnh link cho các logo
    <footer className="footer">
      <div className="container mx-auto">
        <div className="footer__top py-5 flex flex-col md:flex-row justify-between items-start border-b-2 border-gray-500 px-4">
          <div className="w-full md:w-1/6">
            <p className="footer__heading">TIX</p>
            <ul>
              <li>
                <NavLink to="" className="mb-4 block pr-7 hover:text-white">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="" className="mb-4 block pr-7 hover:text-white">
                  Brand Guidelines
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/6">
            <p className="footer__heading"> </p>
            <ul className="md:mt-9">
              <li>
                <NavLink to="" className="mb-4 block pr-7 hover:text-white">
                  Thỏa thuận sử dụng
                </NavLink>
              </li>
              <li>
                <NavLink to="" className="mb-4 block pr-7 hover:text-white">
                  Chính sách bảo mật
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/6">
            <p className="footer__heading md:ml-3 lg:ml-5">ĐỐI TÁC</p>
            <div className="flex">
              <div className="w-1/5 my-2">
                <div className="logoPartner">
                  <img src="./logo/cgv.jpeg" alt="" className="mx-auto block" />
                </div>
                <div className=" mt-4 logoPartner">
                  <img src="./logo/mega.png" alt="" className="mx-auto block" />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/starlight.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/agribank.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
              </div>
              <div className="w-1/5 my-2">
                <div className="logoPartner">
                  <img src="./logo/bhd.png" alt="" className="mx-auto block" />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/beta.jpeg"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/dcine.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/viettin.jpeg"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
              </div>
              <div className="w-1/5 my-2">
                <div className="logoPartner">
                  <img
                    src="./logo/galaxy.jpeg"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img src="./logo/ddc.jpeg" alt="" className="mx-auto block" />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/zalopay.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img src="./logo/ivb.png" alt="" className="mx-auto block" />
                </div>
              </div>
              <div className="w-1/5 my-2">
                <div className="logoPartner">
                  <img
                    src="./logo/cinestar.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/touch.jpeg"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/payoo.jpeg"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/123go.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
              </div>
              <div className="w-1/5 my-2">
                <div className="logoPartner">
                  <img
                    src="./logo/lotte.jpeg"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/cinemax.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/vietcom.jpeg"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
                <div className=" mt-4 logoPartner">
                  <img
                    src="./logo/laban.png"
                    alt=""
                    className="mx-auto block"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/6 text-center mt-5 md:m-0" id="apps">
            <p className="footer__heading">MOBILE APP</p>
            <div className="mobileIcon flex justify-center">
              <img
                src="./logo/apple.png"
                alt=""
                width="30"
                height="30"
                className=" block mr-4"
              />
              <img src="./logo/android.png" alt="" width="30" height="30" />
            </div>
          </div>
          <div className="w-full md:w-1/6 text-center mt-5 md:m-0">
            <p className="footer__heading">SOCIAL</p>
            <div className="socialIcon flex justify-center">
              <img
                src="./logo/facebook.png"
                alt=""
                width="30"
                height="30"
                className=" block mr-4"
              />
              <img src="./logo/zalo.png" alt="" width="30" height="30" />
            </div>
          </div>
        </div>
        <div className="footer__bottom flex-col mt-6 md:flex-row flex text-center md:text-left">
          <div className="w-full md:w-1/12">
            <img
              src="./logo/zion.jpeg"
              alt=""
              className="rounded-lg block mx-auto mb-5"
              width="80"
            />
          </div>
          <div className="w-full md:w-9/12 pl-4" id="contact">
            <p className="footer__heading">
              TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
            </p>
            <p>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </p>
            <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
            <p>
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </p>
            <p>Số Điện Thoại (Hotline): 1900 545 436</p>
            <p>
              Email:{" "}
              <a href="" className=" text-red-600 hover:text-red-700">
                support@tix.vn
              </a>
            </p>
          </div>
          <div className="w-full md:w-2/12">
            <a href="http://online.gov.vn/Home/WebDetails/62782?AspxAutoDetectCookieSupport=1">
              <img
                src="./logo/logoSaleNoti.png"
                alt=""
                width="130"
                className=" block mx-auto mb-5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
