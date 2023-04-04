import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  GetListFilmAction,
  DeleteFilmAction,
  OpenAdminModelAction,
} from "../../redux/actions/FilmAction";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";

const { Search } = Input;

export default function ManageFilmPage() {
  const { arrFilm } = useSelector((state) => state.FilmReducer);
  const [valSearch, setValSearch] = useState("");
  const onSearch = (value) => {
    setValSearch(value);
  };
  const onEnter = (e) => {
    setValSearch(e.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const action = GetListFilmAction(valSearch);
    dispatch(action);
  }, [valSearch]);
  const confirm = (film) => {
    const action = DeleteFilmAction(film.maPhim);
    dispatch(action);
  };
  const data = arrFilm;
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      value: (text, object) => <span>{text}</span>,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["ascend", "descend"],
      width: 70,
      fixed: "left",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => (
        <img
          src={text}
          alt=""
          className="rounded w-14 h-20 "
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://picsum.photos/id/${index}/200/200`;
          }}
        />
      ),
      width: 100,
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let film1 = a.tenPhim.toLowerCase().trim();
        let film2 = b.tenPhim.toLowerCase().trim();
        if (film1 > film2) return 1;
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, object, index) => {
        if (text.length > 100) return text.substring(0, 100) + "...";
        return text;
      },
      width: 300,
    },
    {
      title: "",
      render: (text, film, index) => {
        return (
          <div className="flex items-center justify-center flex-col md:flex-row">
            <button
              className="rounded bg-yellow-600 hover:bg-yellow-700 p-2 mx-1 my-2 text-white flex items-center justify-center"
              onClick={() => {
                const action = OpenAdminModelAction("EditFilm", film);
                dispatch(action);
              }}
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa phim ${film.tenPhim} không?`}
              onConfirm={() => confirm(film)}
              okText="Yes"
              cancelText="No"
            >
              <button className="rounded bg-red-600 hover:bg-red-700 p-2 mx-1 my-2 text-white flex items-center justify-center">
                <DeleteOutlined />
              </button>
            </Popconfirm>
            <button
              className="rounded bg-blue-600 hover:bg-blue-700 p-2 mx-1 my-2 text-white flex items-center justify-center"
              onClick={() => {
                const action = OpenAdminModelAction("AddShowTime", film);
                dispatch(action);
              }}
            >
              <CalendarOutlined />
            </button>
          </div>
        );
      },
      fixed: "right",
      width: 80,
    },
  ];
  return (
    <div className="container my-5">
      <h3 className="text-3xl font-bold mb-4">Quản lý phim</h3>
      <div className="grid grid-cols-10 mb-3 ">
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white  rounded-md px-3 py-2 col-span-4 md:col-span-2 xl:col-span-1"
          onClick={() => {
            const action = OpenAdminModelAction("AddFilm");
            dispatch(action);
          }}
        >
          Thêm phim
        </button>
        <Search
          className="pl-3 rounded col-span-6 md:col-span-8 xl:col-span-9 "
          placeholder="Nhập nội dung"
          allowClear
          enterButton
          size="large"
          onSearch={onSearch}
          onPressEnter={onEnter}
        />
      </div>
      <Table
        scroll={{ x: 700 }}
        columns={columns}
        dataSource={data}
        rowKey="maPhim"
      />
    </div>
  );
}
