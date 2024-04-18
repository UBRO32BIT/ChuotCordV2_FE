import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

interface Route {
    path: string;
    page: React.ComponentType<any>;
}

const privateRoutes: Route[] = [
   
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
    }
    // {
    //     path: '/post/:postId',
    //     page: PostDetail
    // },
    // {
    //     path: 'timeshare/:timeshareId/book',
    //     page: Booking
    // },
    // {
    //     path: '/payment/:userId/vnpay_return',
    //     page: VNPay
    // },
];

export {
    privateRoutes,
    publicRoutes
};
