import React, {useEffect, useState} from 'react'
import {DeleteUserAction, GetListUserAction, OpenAdminModelAction} from "../../redux/actions/UserAction";
import {useDispatch, useSelector} from "react-redux";
import {Input, Popconfirm, Table} from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const {Search} = Input;
export default function ManageUserPage() {
    const {listUser} = useSelector(state => state.UserReducer);
    const [search, setSearch] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        const action = GetListUserAction(search);
        dispatch(action);
    }, [search])


    const onSearch = value => {
        setSearch(value);
    };
    const onEnter = e => {
        setSearch(e.target.value);
    };
    const confirm = user => {
        const action = DeleteUserAction(user.taiKhoan);
        dispatch(action);
    }
    const data = listUser;
    const columns = [
        {
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            value: (text, object) => <span>{text}</span>,
            sorter: (a, b) => {
                let user1 = a.taiKhoan.toLowerCase().trim();
                let user2 = b.taiKhoan.toLowerCase().trim();
                if (user1 > user2) return 1;
                return -1;
            },
            sortDirections: ["ascend", "descend"],
            width: 110,
            fixed: 'left'
        },
        {
            title: "Mật khẩu",
            dataIndex: "matKhau",
            value: (text, object) => <span>{text}</span>,
            width: 100,
        },
        {
            title: "Họ tên",
            dataIndex: "hoTen",
            sorter: (a, b) => {
                let user1 = a.hoTen.toLowerCase().trim();
                let user2 = b.hoTen.toLowerCase().trim();
                if (user1 > user2) return 1;
                return -1;
            },
            sortDirections: ["ascend", "descend"],
            width: 150,
        },
        {
            title: "Số điện thoại",
            dataIndex: "soDt",
            value: (text, object) => <span>{text}</span>,
            width: 120,
        },
        {
            title: "Email",
            dataIndex: "email",
            value: (text, object) => <span>{text}</span>,
            width: 250,
        },
        {
            title: "Mã loại người dùng",
            dataIndex: "maLoaiNguoiDung",
            value: (text, object) => <span>{text}</span>,
            width: 180,
        },
        {
            title: "",
            render: (text, user, index) => {
                return (
                    <div className="flex items-center justify-center flex-col md:flex-row">
                        <button
                            className="rounded bg-yellow-600 hover:bg-yellow-700 p-2 mx-1 my-2 text-white flex items-center justify-center"
                            onClick={() => {
                                const action = OpenAdminModelAction("EditUser", user);
                                dispatch(action);
                            }}
                        >
                            <EditOutlined/>
                        </button>
                        <Popconfirm
                            title={`Bạn có chắc muốn xóa người dùng ${user.hoTen} không?`}
                            onConfirm={() => confirm(user)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button
                                className="rounded bg-red-600 hover:bg-red-700 p-2 mx-1 my-2 text-white flex items-center justify-center">
                                <DeleteOutlined/>
                            </button>
                        </Popconfirm>
                    </div>
                );
            },
            fixed: "right",
            width: 80,
        },
    ];


    return <>
        <div className="container my-5">
            <h3 className="text-3xl font-bold mb-4">Quản lý người dùng</h3>
            <div className="grid grid-cols-12 mb-3 ">
                <button
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
                    onClick={() => {
                        const action = OpenAdminModelAction("AddUser");
                        dispatch(action);
                    }}
                >
                    Thêm người dùng
                </button>
                <Search
                    className="pl-3 rounded col-span-6 md:col-span-8 lg:col-span-9 xl:col-span-10"
                    placeholder="Nhập nội dung"
                    allowClear
                    enterButton
                    size="large"
                    onSearch={onSearch}
                    onPressEnter={onEnter}
                />
            </div>
            <Table
                scroll={{x: 910}}
                columns={columns}
                dataSource={data}
                rowKey="taiKhoan"
            />
        </div>
    </>
}
