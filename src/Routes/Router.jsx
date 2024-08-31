import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnTutorSync from "../pages/TeachOnTutorSync/TeachOnTutorSync";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import Payment from "../pages/Payment/Payment";
import PrivateRoute from "./PrivateRoutes";
import MyEnrollment from "../Dashboard/StudentDashboard/MyEnrollment/MyEnrollment";
import MyProfile from "../Dashboard/StudentDashboard/MyProfile/MyProfile";
import Dashboard from "../Dashboard/Dashboard";
import AllUsers from "../Dashboard/AdminDashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import Error from "../Error/Error";
import TeacherRequests from "../Dashboard/AdminDashboard/TeacherRequests/TeacherRequests";
import AddClass from "../Dashboard/TeacherDashboard/AddClass/AddClass";
import Myclass from "../Dashboard/TeacherDashboard/MyClass/Myclass";
import TeacherClassDetails from "../Dashboard/TeacherDashboard/MyClass/ClassDetails";
import AdminAllClasses from "../Dashboard/AdminDashboard/AllClassesAdmin/AdminAllClasses";
import MyEnrollClassDetails from "../Dashboard/StudentDashboard/MyEnrollment/MyEnrollClassDetails";
import UpdateClass from "../Dashboard/TeacherDashboard/MyClass/UpdateClass";
import Progress from "../Dashboard/AdminDashboard/AllClassesAdmin/Progress";
import Payments from "../Dashboard/StudentDashboard/Payments/Payments";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/classes',
                element: <AllClasses></AllClasses>
            },
            {
                path: '/classes/:id',
                element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://tutor-sync-server.vercel.app/classes/${params.id}`)
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: ({ params }) => fetch(`https://tutor-sync-server.vercel.app/classes/${params.id}`)
            },
            {
                path: '/teach',
                element: <PrivateRoute><TeachOnTutorSync></TeachOnTutorSync></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                path: 'myenrollclass',
                element: <MyEnrollment />
            },
            {
                path: 'myenrollclass/:id',
                element: <MyEnrollClassDetails />,
                loader: ({ params }) => fetch(`https://tutor-sync-server.vercel.app/enrollments/${params.id}`)
            },
            {
                path: 'my-payments',
                element: <Payments></Payments>,
            },
            {
                path: 'profile',
                element: <MyProfile />
            },
            {
                path: 'add-class',
                element: <AddClass></AddClass>
            },
            {
                path: 'my-classes',
                element: <Myclass></Myclass>
            },
            {
                path: 'update/:id',
                element: <UpdateClass></UpdateClass>,
                loader: ({ params }) => fetch(`https://tutor-sync-server.vercel.app/classReq/${params.id}`)
            },
            {
                path: 'class-details/:id',
                element: <TeacherClassDetails></TeacherClassDetails>,
                loader: ({ params }) => fetch(`https://tutor-sync-server.vercel.app/classReq/${params.id}`)
            },
            // Admin routes
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'teacher-requests',
                element: <AdminRoute><TeacherRequests></TeacherRequests></AdminRoute>
            },
            {
                path: 'admin-allclasses',
                element: <AdminRoute><AdminAllClasses></AdminAllClasses></AdminRoute>
            },
            {
                path: 'progress/:id',
                element: <AdminRoute><Progress></Progress></AdminRoute>,
                loader: ({ params }) => fetch(`https://tutor-sync-server.vercel.app/reviews/${params.id}`)
            },
        ]
    }
]);
