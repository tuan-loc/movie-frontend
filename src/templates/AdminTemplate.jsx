import {NavLink, Redirect, Route} from "react-router-dom";
import {useEffect} from "react";
import {Dropdown, Layout, Menu} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {DONE_LOADING, START_LOADING} from "../redux/types/LoadingType";
import "../assets/css/Admin.css";
import {USER_ACCOUNT} from "../util/setting";
import * as _ from "lodash";
import AdminModal from "../components/AdminModal/AdminModal";

const {Header, Content, Sider} = Layout;

const AdminTemplate = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Movie";
        setTimeout(() => {
            dispatch({type: DONE_LOADING});
        }, 1000);
        dispatch({type: START_LOADING});
    }, []);
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to="/info">Thông tin cá nhân</NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink
                    to="/"
                    onClick={() => {
                        localStorage.clear();
                    }}
                >
                    Đăng xuất
                </NavLink>
            </Menu.Item>
        </Menu>
    );
    return (
        <Route
            exact={props.exact}
            path={props.path}
            render={(propsRoute) => {
                return JSON.parse(localStorage.getItem(USER_ACCOUNT))
                    ?.maLoaiNguoiDung !== "QuanTri" ? (
                    <Redirect to="/"/>
                ) : (
                    <>
                        <AdminModal {...propsRoute} />
                        <Layout className="admin">
                            <Sider
                                breakpoint="md"
                                collapsedWidth="0"
                                onBreakpoint={(broken) => {
                                }}
                                onCollapse={(collapsed, type) => {
                                }}
                            >
                                <div className="logo">
                                    <NavLink to="/">
                                        <img
                                            src="./logo/logo.png"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://picsum.photos/200";
                                            }}
                                            alt=""
                                            className="mx-auto block w-12 mb-3 mt-6 rounded-lg"
                                        />
                                    </NavLink>
                                </div>
                                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                                    <Menu.Item key="1" icon={<i className="fas fa-film"></i>}>
                                        <NavLink to="/admin/film">Quản lý phim</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<UserOutlined/>}>
                                        <NavLink to="/admin/user">Quản lý người dùng</NavLink>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header
                                    className="site-layout-sub-header-background bg-white shadow-md"
                                    style={{padding: 0}}
                                >
                                    <div className="flex items-center justify-end text-center text-white h-full">
                                        <Dropdown overlay={menu} trigger={["click"]}>
                                            <a
                                                className="ant-dropdown-link text-base font-bold mr-4 text-white hover:text-red-600 flex justify-center items-center"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <p className="rounded-full bg-white text-black w-10 h-10 m-0 mr-1 flex items-center justify-center  transition-all duration-300">
                          <span>
                            {_.upperCase(
                                JSON.parse(
                                    localStorage.getItem(USER_ACCOUNT)
                                ).hoTen.substring(0, 2)
                            )}
                          </span>
                                                </p>
                                                <DownOutlined/>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </Header>
                                <Content
                                    style={{margin: "18px 16px "}}
                                    className="bg-white shadow-md h-full"
                                >
                                    <props.component {...propsRoute} />
                                </Content>
                            </Layout>
                        </Layout>
                    </>
                );
            }}
        />
    );
};
export default AdminTemplate;
