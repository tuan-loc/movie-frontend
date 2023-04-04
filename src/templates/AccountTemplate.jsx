import {NavLink, Route} from "react-router-dom";
import {Fragment, useEffect} from "react";
import "../assets/css/Account.css";
import {useDispatch} from "react-redux";
import {DONE_LOADING, START_LOADING} from "../redux/types/LoadingType";

const AccountTemplate = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Movie";
        setTimeout(() => {
            dispatch({type: DONE_LOADING});
        }, 1000);
        dispatch({type: START_LOADING});
    }, []);
    return (
        <Route
            exact={props.exact}
            path={props.path}
            render={(propsRoute) => {
                return (
                    <Fragment>
                        <div className="account__card">
                            <div className="account__card__body">
                                <NavLink
                                    to="/"
                                    className="fa fa-times account__card__close"
                                ></NavLink>
                                <img
                                    src="./logo/logo.png"
                                    alt=""
                                    className="account__logo w-20 block text-center mx-auto"
                                />
                                <props.component {...propsRoute} />
                                <div className=" flex flex-col justify-center items-center mt-2">
                                    <button
                                        className="social-button"
                                        style={{background: "#3d63b5"}}
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                        Đăng nhập bằng Facebook
                                    </button>
                                    <button
                                        className="social-button"
                                        style={{
                                            background: "#fff",
                                            color: "#000",
                                        }}
                                    >
                                        <img
                                            src="./logo/google.png"
                                            alt=""
                                            width="20"
                                            style={{
                                                borderColor: "rgba(0,0,0,0.1)",
                                            }}
                                        />
                                        Đăng nhập bằng Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            }}
        />
    );
};
export default AccountTemplate;
