import { Carousel } from "antd";
import React from "react";

import caro2 from "../../../assets/caro2.avif";
import caro3 from "../../../assets/caro3.avif";

import caro7 from "../../../assets/caro7.avif";
import caro6 from "../../../assets/caro6.avif";

const contentStyle: React.CSSProperties = {
  height: "560px",
  width: "1850px",
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
          <img src={caro2} style={contentStyle} alt="" />
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
        <div>
          <img src={caro3} style={contentStyle} alt="" />
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
        <div>
          <img src={caro7} style={contentStyle} alt="" />
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
        <div>
          <img src={caro6} style={contentStyle} alt="" />
          {/* <h3 style={contentStyle}> </h3> */}
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
