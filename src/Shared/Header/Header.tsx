// import { logout } from "@/redux/features/auth/authSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
// import { Button } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  // const user = useAppSelector((state) => state.auth.user);
  // const dispatch = useAppDispatch();
  const menuItems = (
    <>
      <Link to="/">
        <li className="font-bold mx-2 ">Home</li>
      </Link>
      <Link to="/meetingrooms">
        <li className="font-bold mx-2 ">Meeting Rooms</li>
      </Link>
      <Link to="/aboutus">
        <li className="font-bold mx-2 ">About Us</li>
      </Link>
      <Link to="/contactus">
        <li className="font-bold mx-2 ">Contact Us</li>
      </Link>
      {/* {user?.email ? (
        <Button onClick={() => dispatch(logout())}>
          <li className="font-bold mx-2 ">Log Out</li>
        </Button>
      ) : (
        <Link to="/login">
          <li className="font-bold mx-2 ">Login</li>
        </Link>
      )} */}
      <Link to="/login">
        <li className="font-bold mx-2 ">Login</li>
      </Link>
      <Link to="/signup">
        <li className="font-bold mx-2 ">Sign Up</li>
      </Link>
      <Link to="/manageRoom">
        <li className="font-bold mx-2 ">Manage Room</li>
      </Link>
      <Link to="/manageSlot">
        <li className="font-bold mx-2 ">Manage Slot</li>
      </Link>
      <Link to="/myBookings">
        <li className="font-bold mx-2 ">My Bookings</li>
      </Link>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Space Nest
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
