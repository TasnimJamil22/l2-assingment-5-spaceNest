import { Button, Card, Image } from "antd";

import roomImg1 from "../../assets/room1.webp";
import roomImg2 from "../../assets/room11.jpg";
import roomImg3 from "../../assets/room4.avif";
import roomImg4 from "../../assets/room13.avif";

import { useGetRoomByIdQuery } from "@/redux/features/rooms/roomApi";
import { getRoomById } from "@/redux/features/rooms/roomSlice";

import { Link, useParams } from "react-router-dom";

const MeetingRoomDetails = () => {
  const { id } = useParams();
  const { data: room, isError } = useGetRoomByIdQuery(id);

  console.log(isError);
  console.log(id);
  console.log(room?.data?.name);
  getRoomById(id);

  return (
    <div>
      <h1 className="text-2xl font-bold m-5">{room?.data?.name}</h1>
      <div className="text-center">
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}>
          <Image className="border rounded-lg " width={300} src={roomImg1} />
          <Image className="border rounded-lg " width={300} src={roomImg2} />
          <Image className="border rounded-lg " width={300} src={roomImg3} />
          <Image className="border rounded-lg " width={300} src={roomImg4} />
        </Image.PreviewGroup>
      </div>
      <div>
        <Card
          hoverable
          style={{ width: 1040 }}
          className="bg-orange-100 items-center mx-auto">
          <h4 className="text-2xl font-bold">{room?.data?.name}</h4>
          <h4 className="text-1xl font-bold">Room No:{room?.data?.roomNo}</h4>
          <h4 className="text-1xl font-bold">Floor No:{room?.data?.floorNo}</h4>
          <h4 className="text-1xl font-bold">
            Capacity:{room?.data?.capacity}
          </h4>
          <h4 className="text-1xl font-bold">
            Price Per Slot:{room?.data?.pricePerSlot}
          </h4>
          <h4 className="text-1xl font-bold">
            Amenities:{room?.data?.amenities?.join(", ")}
          </h4>
          <Button className="bg-amber-300">
            <Link to="/booking">Book Now</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MeetingRoomDetails;
