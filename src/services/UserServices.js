import {GROUP_ID, http} from "../util/setting";

class UserService {
    Register(user) {
        return http.post(`/api/QuanLyNguoiDung/DangKy`, user);
    }

    Login(account) {
        return http.post("/api/QuanLyNguoiDung/DangNhap", account);
    }

    GetListUser(searchValue) {
        if (searchValue !== "")
            return http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${searchValue}`)
        return http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
    }

    AddUser(user) {
        return http.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, user)
    }

    EditUser(user) {
        return http.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user)
    }

    DeleteUser(taiKhoan) {
        return http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    GetUser() {
        return http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }
}

export const userService = new UserService();
