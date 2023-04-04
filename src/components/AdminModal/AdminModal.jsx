import React from "react";
import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {CloseAdminModelAction} from "../../redux/actions/FilmAction";
import AddFilmPage from "../../pages/ManageFilmPage/AddFilmPage";
import EditFilmPage from "../../pages/ManageFilmPage/EditFilmPage";
import AddShowTimePage from "../../pages/ManageFilmPage/AddShowTimePage";
import AddUserPage from "../../pages/ManageUserPage/AddUserPage";
import EditUserPage from "../../pages/ManageUserPage/EditUserPage";

export default function AdminModal() {
    const {openModal, componentType} = useSelector(
        (state) => state.FilmReducer
    );
    const dispatch = useDispatch();
    let component, title;
    if (componentType === "AddFilm") {
        component = <AddFilmPage/>;
        title = "Thêm Phim";
    } else if (componentType === "EditFilm") {
        component = <EditFilmPage/>;
        title = "Chỉnh sửa phim";
    } else if (componentType === "AddShowTime") {
        component = <AddShowTimePage/>;
        title = "Tạo lịch chiếu";
    } else if (componentType === "AddUser") {
        component = <AddUserPage/>;
        title = "Thên người dùng";
    } else if (componentType === "EditUser") {
        component = <EditUserPage/>;
        title = "Chỉnh sửa người dùng";
    }

    return (
        <>
            <Modal
                title={title}
                centered
                visible={openModal}
                onOk={() => dispatch(CloseAdminModelAction())}
                onCancel={() => dispatch(CloseAdminModelAction())}
                width={1000}
                footer={null}
            >
                {component}
            </Modal>
        </>
    );
}
