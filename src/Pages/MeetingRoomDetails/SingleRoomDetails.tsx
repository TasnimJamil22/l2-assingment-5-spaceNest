type TRoom = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
};
interface MeetingRoomProps {
  room: TRoom; // Expect a room prop of type TRoom
}

const SingleRoomDetails = ({ room }: MeetingRoomProps) => {
  const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } = room;
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{name}</h1>
      <div style={{ marginBottom: "10px" }}>
        <strong>Room Number: </strong>
        {roomNo}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Floor Number: </strong>
        {floorNo}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Capacity: </strong>
        {capacity} people
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Price per Slot: </strong>${pricePerSlot}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Amenities: </strong>
        {amenities.join(", ")}
      </div>
    </div>
  );
};

export default SingleRoomDetails;
