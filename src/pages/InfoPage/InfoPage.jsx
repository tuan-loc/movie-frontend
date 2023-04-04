import React, {useEffect} from "react";
import {GetUserAction, OpenAdminModelAction} from "../../redux/actions/UserAction";
import {useDispatch, useSelector} from "react-redux";
import {Table} from 'antd';
import moment from "moment";

const columns = [
    {
        title: 'Tên Phim',
        dataIndex: 'tenPhim',
        sorter: (a, b) => {
            const name1 = a.trim().toLowerCase();
            const name2 = b.trim().toLowerCase();
            if (name1 > name2) return -1;
            return 1;
        },
        sortDirections: ['ascend, descend'],
        fixed: 'left',
        width: '300',
    },
    {
        title: 'Hình ành phim',
        dataIndex: 'hinhAnh',
        render: (text, record, index) => (<img src={record.hinhAnh} className='rounded w-10 h-14' alt=""/>),
        width: '40',

    },
    {
        title: 'Thời lượng phim',
        dataIndex: 'thoiLuongPhim',
        render: (text, record, index) => (<span>{text} phút</span>),
        width: '60',

    },
    {
        title: 'Giá vé',
        dataIndex: 'giaVe',
        render: (text, record, index) => (<span>{text.toLocaleString()}đ</span>),
        width: '80',

    },
    {
        title: 'Ngày đặt',
        dataIndex: 'ngayDat',
        render: (text, record, index) => (<span>{moment(text).format('hh:mm, DD/MM/YYYY')}</span>),
        width: '100',

    },
    {
        title: 'Hệ thống rạp',
        dataIndex: 'danhSachGhe[0].maHeThongRap',
        render: (text, record, index) => (<span>{record.danhSachGhe[0].maHeThongRap}</span>),
        width: '100',

    },
    {
        title: 'Tên cụm rạp',
        dataIndex: 'danhSachGhe[0].tenHeThongRap',
        render: (text, record, index) => (<span>{record.danhSachGhe[0].tenHeThongRap}</span>),
        width: '100',

    },
    {
        title: 'Tên rạp',
        dataIndex: 'danhSachGhe[0].tenCumRap',
        render: (text, record, index) => (<span>{record.danhSachGhe[0].tenCumRap}</span>),
        width: '70',

    },
    {
        title: 'Danh sách ghế',
        dataIndex: 'danhSachGhe',
        render: (text, record, index) => {
            return <div className='grid grid-cols-3 overflow-scroll h-12'>
                {record.danhSachGhe.map((ghe, index) => {
                    return <span className='mx-2 flex items-center justify-center'>{ghe.tenGhe}</span>
                })}
            </div>

        },
        width: '150',

    },
];

function onChange(pagination, filters, sorter, extra) {

}

export default function InfoPage() {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.UserReducer)
    useEffect(() => {
        const action = GetUserAction();
        dispatch(action);
    }, []);
    const {thongTinDatVe} = userInfo;
    console.log(thongTinDatVe)
    const data = thongTinDatVe;
    return (
        <div className='container mx-auto'>
            <div className="shadow-lg personal-info p-4 my-4 container">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-3 mb-3 flex items-center justify-center">
                        <img src="https://picsum.photos/200" alt="Avatar" className="rounded-full w-20 block mx-auto"/>
                    </div>
                    <div className='col-span-12 md:col-span-8 '>
                        <h3 className='text-2xl font-bold'>Thông tin cá nhân</h3>
                        <div className="flex flex-col lg:flex-row">
                            <div className='md:mr-10'>
                                <div className='flex  text-lg mt-1'>
                                    <span className="font-bold indivne-block w-40">Họ tên: </span>
                                    <span>{userInfo?.hoTen}</span>
                                </div>
                                <div className='flex text-lg mt-1'>
                                    <span className="font-bold indivne-block w-40">Email: </span>
                                    <span>{userInfo?.email}</span>
                                </div>
                                <div className='flex text-lg mt-1'>
                                    <span className="font-bold indivne-block w-40">Số điện thoại: </span>
                                    <span>{userInfo?.soDT || userInfo?.soDt}</span>
                                </div>
                            </div>
                            <div className="">
                                <div className='flex text-lg mt-1'>
                                    <span className="font-bold inline-block w-40">Tài khoản: </span>
                                    <span>{userInfo?.taiKhoan}</span>
                                </div>
                                <div className='flex text-lg mt-1'>
                                    <span className="font-bold inline-block w-40">Mật khẩu: </span>
                                    <span>{userInfo?.matKhau}</span>
                                </div>
                                <div className='flex text-lg mt-1'>
                                    <span className="font-bold inline-block w-40">Loại người dùng: </span>
                                    <span>{userInfo?.maLoaiNguoiDung}</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <button className="bg-yellow-500 mt-2 hover:bg-yellow-600 text-white py-2 px-4 rounded "
                                    onClick={() => {
                                        const action = OpenAdminModelAction("EditUser", userInfo);
                                        dispatch(action);
                                    }}>
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-lg history-booked-ticket p-4 my-4 -container">
                <h3 className='text-2xl font-bold'>Lịch sử đặt vé</h3>
                <Table scroll={{x: 1000}} columns={columns} dataSource={data} onChange={onChange}/>
            </div>
        </div>
    )
}