import { useGetUsersBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useAppSelector } from "@/redux/features/hooks";
import { Card } from "antd";
import { useEffect, useState } from "react";

const MyBookings = () => {
  // Step 1: Get the token from Redux or localStorage
  const { token } = useAppSelector((state) => state.auth); // Assuming auth slice has a token field
  const tokenFromLocalStorage = localStorage.getItem("token"); // Optionally fallback to localStorage

  // Combine both (use Redux if available, else fallback to localStorage)
  const authToken = token || tokenFromLocalStorage;
  const [roomName, setRoomName] = useState<string>("");
  const [roomCost, setRoomCost] = useState<string>("");
  const [bookedDate, setBookedDate] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<TSlot[]>([]); // Define bookedSlots as an array of TSlot

  const user = useAppSelector((state) => state.auth.user);
  const { data } = useGetUsersBookingsQuery("", {
    skip: !authToken,
  });

  type TSlot = {
    _id: string;
    room: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  };
  // const slots: TSlot[] = data?.slots ?? [];

  //type of room object in TBookingData
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
  //type of user object in TBookingData

  type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
  };
  //type of bookingData array
  type TBookingData = {
    _id: string;
    data: string;
    slots: TSlot[];
    room: TRoom;
    user: TUser;
    isConfirmed: boolean;
    isDeteted: boolean;
  };
  // const bookingData: TBookingData[] = data?.data ?? [];

  // const { room, slots, totalAmount, isConfirmed } = bookingData;
  // console.log(bookingData);
  console.log(user);

  // Filter the booking that matches the current logged-in user
  const currentUserBooking = data?.data?.find(
    (booking: TBookingData) => booking?.user.email === user?.email
  );
  console.log("current user's booking", currentUserBooking);

  // Use effect to set room name and cost when booking data is available

  useEffect(() => {
    if (currentUserBooking && currentUserBooking.slots) {
      try {
        const room = currentUserBooking.room.name;
        const cost = currentUserBooking.room.pricePerSlot;
        const date = currentUserBooking.date;
        const slots = currentUserBooking.slots;

        setRoomName(room);
        setRoomCost(cost.toString()); // Ensure cost is treated as a string
        setBookedDate(date);
        setBookedSlots(slots);
      } catch (err) {
        console.error("Error fetching room data:", err);
      }
    }
  }, [currentUserBooking]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>

      {roomName && roomCost && bookedSlots.length > 0 ? (
        <Card className="bg-white shadow-lg rounded-lg bg-blue-50">
          <h2 className="text-xl font-semibold">{roomName}</h2>
          <h3 className="text-lg text-gray-700">Cost: ${roomCost}</h3>
          <h4 className="text-md text-gray-600">Date: {bookedDate}</h4>

          <div className="mt-4">
            <h4 className="text-md font-semibold">Slots:</h4>
            <ul className="list-disc pl-5 mt-2">
              {bookedSlots.map((slot, index) => (
                <li key={index} className="mt-2">
                  <div>
                    <strong>Start Time:</strong> {slot.startTime}
                  </div>
                  <div>
                    <strong>End Time:</strong> {slot.endTime}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    {slot.isBooked ? "Confirmed" : "Unconfirmed"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
};

export default MyBookings;
