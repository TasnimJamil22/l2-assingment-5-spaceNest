import Main from "@/Layout/Main";
import AboutUs from "@/Pages/AboutUs/AboutUs";
import RoomManagement from "@/Pages/Admin/RoomManagement/RoomManagement";
import Booking from "@/Pages/Booking/Booking";
import CheckOut from "@/Pages/CheckOut/CheckOut";
// import Confirm from "@/Pages/CheckOut/Confirm";
import ContactUs from "@/Pages/ContactUs/ContactUs";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import MeetingRoomDetails from "@/Pages/MeetingRoomDetails/MeetingRoomDetails";

import MeetingRooms from "@/Pages/MeetingRooms/MeetingRooms";
import SignUp from "@/Pages/SignUp/SignUp";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/meetingrooms",
        element: <MeetingRooms></MeetingRooms>,
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contactus",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/roomDetails/:id",
        element: <MeetingRoomDetails></MeetingRoomDetails>,
      },
      {
        path: "/booking",
        element: <Booking></Booking>,
      },
      {
        path: "/checkout",
        element: <CheckOut></CheckOut>,
      },
      // {
      //   path: "/confirm",
      //   element: <Confirm></Confirm>,
      // },
      {
        path: "/manageRoom",
        element: <RoomManagement></RoomManagement>,
      },
    ],
  },
]);

export default router;
