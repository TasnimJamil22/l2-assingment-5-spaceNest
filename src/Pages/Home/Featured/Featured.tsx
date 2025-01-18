// import { Button, Card, Col, Row } from "antd";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Featured = () => {
//   const [products, setProducts] = useState();
//   const featuredProducts = [
//     { name: "a" },
//     { name: "b" },
//     { name: "c" },
//     { name: "d" },
//     { name: "e" },
//     { name: "f" },
//     { name: "g" },
//   ];
//   return (
//     <div>
//       <div className="mt-10 xl:px-24  bg-slate-50 ">
//         <h1 className="font-bold text-center text-3xl my-5">
//           Featured Products
//         </h1>
//         <div>
//           <Row gutter={16}>
//             {featuredProducts.map((item) => (
//               <Col sm={24} lg={12} xl={6}>
//                 <Card
//                   title={<span style={{ fontSize: "28px" }}>{item.name}</span>}
//                   bordered={false}
//                   className="bg-slate-100 text-blue-900">
//                   <p className="py-4 my-auto  ">Orders over $500</p>
//                   <Button>
//                     <Link to="/products">See more..</Link>{" "}
//                   </Button>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Featured;
