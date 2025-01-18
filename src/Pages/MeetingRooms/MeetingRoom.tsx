import { Button, Card, Col } from "antd";
import img1 from "../../assets/room1.webp";
import { Link } from "react-router-dom";
export type TRoom = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
};
export interface MeetingRoomProps {
  room: TRoom; // Expect a room prop of type TRoom
}

const MeetingRoom = ({ room }: MeetingRoomProps) => {
  const { _id, name, roomNo, floorNo, capacity, pricePerSlot } = room;

  return (
    <Col sm={24} lg={12} xl={6} className="my-5">
      <Card
        // title={<span style={{ fontSize: "28px" }}></span>}
        bordered={false}
        className="bg-red-50 text-blue-900 border border-red-200">
        <img className="border rounded-lg" src={img1} alt="" />
        <p className="py-4 my-auto text-2xl font-bold "> {name}</p>
        <p className="py-4 my-auto text-1xl font-bold ">Room No: {roomNo}</p>
        <p className="py-4 my-auto text-1xl font-bold ">Floor no:{floorNo}</p>
        <p className="py-4 my-auto text-1xl font-bold">Capacity: {capacity}</p>
        <p className="py-4 my-auto text-1xl font-bold">
          Price Per Slot: ${pricePerSlot}
        </p>
        <Button className="font-bold text-1xl p-5">
          <Link to={`/roomDetails/${_id}`}>See Details</Link>
        </Button>
      </Card>
    </Col>
  );
};

export default MeetingRoom;
