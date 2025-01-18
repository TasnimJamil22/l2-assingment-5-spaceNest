import { Button, Carousel } from "antd";
import React from "react";
import "./Banner.css";

import room12 from "../../../assets/room12.jpg";
import room26 from "../../../assets/room26.webp";
import room9 from "../../../assets/room9.avif";
import room23 from "../../../assets/room23.avif";
import { Link } from "react-router-dom";

const contentStyle: React.CSSProperties = {
  height: "760px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  margin: "0 auto",
  borderRadius: "10px",

  // backgroundImage:
  //   "url('https://unsplash.com/photos/a-computer-keyboard-sitting-on-top-of-a-desk-epWDHKngIJg')",
  background: "#364d79",
};
const Banner = () => {
  return (
    <div>
      <Carousel effect="fade">
        <div>
          <img
            // style={{ width: "800px", height: "300px", ...contentStyle }}
            src={room9}
            style={contentStyle}
            alt=""
          />
          <div className="carousel-headline">
            <h2>Book Your Ideal Meeting Room with Ease</h2>
            <p className="subheading">
              Efficient, hassle-free room booking for all your meeting needs.
            </p>
            <Button className="cta-button">
              <Link to="/meetingrooms" className="btn btn-ghost text-xl">
                Book Now
              </Link>
            </Button>
          </div>
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
        <div>
          <img src={room12} style={contentStyle} alt="" />
          <div className="carousel-headline">
            <h2>Book Your Ideal Meeting Room with Ease</h2>
            <p className="subheading">
              Efficient, hassle-free room booking for all your meeting needs.
            </p>
            <Button className="cta-button">
              <Link to="/meetingrooms" className="btn btn-ghost text-xl">
                Book Now
              </Link>
            </Button>
          </div>
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
        <div>
          <img src={room23} style={contentStyle} alt="" />
          <div className="carousel-headline">
            <h2>Book Your Ideal Meeting Room with Ease</h2>
            <p className="subheading">
              Efficient, hassle-free room booking for all your meeting needs.
            </p>
            <Button className="cta-button">
              <Link to="/meetingrooms" className="btn btn-ghost text-xl">
                Book Now
              </Link>
            </Button>
          </div>
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
        <div>
          <img src={room26} style={contentStyle} alt="" />
          <div className="carousel-headline">
            <h2>Book Your Ideal Meeting Room with Ease</h2>
            <p className="subheading">
              Efficient, hassle-free room booking for all your meeting needs.
            </p>
            <Button className="cta-button">
              <Link to="/meetingrooms" className="btn btn-ghost text-xl">
                Book Now
              </Link>
            </Button>
          </div>
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
