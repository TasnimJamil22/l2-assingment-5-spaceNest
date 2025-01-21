import { Card, Col, Row } from "antd";

const Service = () => {
  return (
    <div>
      <div className="mt-10 xl:px-24  bg-slate-50 ">
        <h1 className="font-bold text-center text-3xl my-5">Services</h1>
        <Row gutter={16}>
          <Col sm={24} lg={12} xl={6}>
            <Card
              title={
                <span style={{ fontSize: "28px" }}>Real-Time Availability</span>
              }
              bordered={false}
              className="bg-sky-100 text-blue-900">
              <p className="py-4 my-auto  ">Orders over $500</p>
            </Card>
          </Col>
          <Col sm={24} lg={12} xl={6}>
            <Card
              title={
                <span style={{ fontSize: "28px" }}>
                  Instant Booking Confirmation
                </span>
              }
              bordered={false}
              className="bg-orange-100 text-orange-900">
              <p className="py-4 my-auto  ">100% secure</p>
            </Card>
          </Col>
          <Col sm={24} lg={12} xl={6}>
            <Card
              title={
                <span style={{ fontSize: "28px" }}>Flexible Scheduling</span>
              }
              bordered={false}
              className="bg-yellow-100 text-blue-900">
              <p className="py-4 my-auto  ">Over 40% cashback</p>
            </Card>
          </Col>
          <Col sm={24} lg={12} xl={6}>
            <Card
              title={<span style={{ fontSize: "28px" }}>24/7 Support</span>}
              bordered={false}
              className="bg-green-100 text-blue-900">
              <p className="py-4 my-auto  ">Ready for you</p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Service;
