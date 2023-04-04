import "./App.css";
import {Router, Switch} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import AccountTemplate from "./templates/AccountTemplate";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import {createBrowserHistory} from "history";
import FilmDetailPage from "./pages/FilmDetailPage";
import Loading from "./components/Loading/Loading";
import BookingTicketPage from "./pages/BookingTicketPage/BookingTicketPage";
import AdminTemplate from "./templates/AdminTemplate";
import ManageFilmPage from "./pages/ManageFilmPage/ManageFilmPage";
import ManageUserPage from "./pages/ManageUserPage/ManageUserPage";
import InfoPage from "./pages/InfoPage/InfoPage";

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Loading></Loading>
            <Switch>
                <HomeTemplate exact={true} path="/home" component={HomePage}/>
                <HomeTemplate
                    exact={true}
                    path="/detail/:id/:name"
                    component={FilmDetailPage}
                />
                <HomeTemplate
                    exact={true}
                    path="/detail/:id"
                    component={FilmDetailPage}
                />
                <HomeTemplate
                    exact={true}
                    path="/booking-ticket/:id"
                    component={BookingTicketPage}
                />
                <HomeTemplate exact={true} path='/info' component={InfoPage}/>
                <HomeTemplate exact={true} path="/" component={HomePage}/>
                <AccountTemplate exact={true} path="/login" component={LoginForm}/>
                <AccountTemplate
                    exact={true}
                    path="/register"
                    component={RegisterForm}
                />
                <AdminTemplate exact={true} path="/admin" component={ManageFilmPage}/>
                <AdminTemplate
                    exact={true}
                    path="/admin/film"
                    component={ManageFilmPage}
                />
                <AdminTemplate
                    exact={true}
                    path="/admin/user"
                    component={ManageUserPage}
                />
                <HomeTemplate exact={false} path="*" component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

export default App;
