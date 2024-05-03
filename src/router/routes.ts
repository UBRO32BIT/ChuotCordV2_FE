import Chat from "../pages/Chat";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

interface Route {
    path: string;
    page: React.ComponentType<any>;
}

const privateRoutes: Route[] = [
    {
        path: '/chat',
        page: Chat
    }
];

const adminRoutes: Route[] = [

]
const publicRoutes: Route[] = [
    {
        path: '/',
        page: Home
    },
    {
        path: '/login',
        page: Login
    },
    {
        path: '/register',
        page: Register
    },
];

export {
    privateRoutes,
    publicRoutes
};
