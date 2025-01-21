import { useGetUsersQuery } from "@/redux/features/auth/authApi";
import { useGetAvailableSlotsQuery } from "@/redux/features/booking/bookingApi";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";

import { useAppSelector } from "@/redux/features/hooks";
import { useGetRoomByIdQuery } from "@/redux/features/rooms/roomApi";

import { Button, Card, Modal } from "antd";

import { useEffect, useState } from "react";

// import { Modal } from "antd";
const CheckOut = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [roomCost, setRoomCost] = useState<string>("");
  const [thanks, setThanks] = useState<boolean>(false);
  const [createMyBooking, setCreateMyBooking] = useState<string | null>(null); // Initialize as null
  console.log("this is createMyBooking", createMyBooking);
  const { bookingDetails } = useAppSelector((state) => state.booking);
  console.log(bookingDetails);

  const { data: roomData, isError } = useGetRoomByIdQuery(bookingDetails.room);
  console.log(isError);
  console.log(roomData);

  //user info show
  const { user } = useAppSelector((state) => state.auth);

  console.log("user", user);

  const { data } = useGetUsersQuery("");
  const [createBooking, { error }] = useCreateBookingMutation();
  console.log(error);
  const { data: slots } = useGetAvailableSlotsQuery("");

  console.log(slots);

  type TSlot = {
    _id: string;
    room: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const slots: TSlot[] = data?.data ?? [];

  const filteredSlots = slots?.data?.filter(
    (slot: TSlot) =>
      slot.startTime === bookingDetails.startTime &&
      slot.endTime === bookingDetails.endTime &&
      slot.date === bookingDetails.date
  );
  console.log("filtered we:", filteredSlots);

  type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
  };
  // const users: TUser[] = data?.data ?? [];

  // Filter to get the current logged-in user based on their _id
  const currentUser: TUser | undefined = data?.data?.find(
    (u: TUser) => u.email === user?.email
  );
  console.log(currentUser);
  //room name show
  //important ,,,,
  //fetched sigle room by id from api and checked if match with bookings room (room= _id)
  useEffect(() => {
    if (roomData) {
      try {
        const room = roomData.data;
        const cost = roomData.data;
        setRoomName(room.name);
        setRoomCost(cost.pricePerSlot);
      } catch (err) {
        console.error("Error fetching room data:", err);
      }
    }
  }, [roomData]);

  console.log("room name", roomName);

  //confirm modal
  // const handleModal = () => {
  // const thanksMessage = "thank you";
  // setThanks(thanksMessage);
  // console.log(thanksMessage);
  // };

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async () => {
    setThanks(true);
    //extracting slot ids from filtered slots
    const slotIds = filteredSlots.map((slot: TSlot) => slot._id);
    //booking creation and sending the bookingData object as parameter in the body of the api
    const bookingData = {
      date: bookingDetails?.date,
      slots: slotIds, //using slots _id to post in the api
      room: bookingDetails?.room,
      user: currentUser?._id,
    };
    // Create booking and wait for the result
    try {
      const result = await createBooking(bookingData).unwrap(); // unwrap to handle result or error
      console.log("Booking created successfully:", result);
      setCreateMyBooking(result._id); // Store the booking ID or relevant info
    } catch (err) {
      console.error("Booking creation failed:", err);
    }
    // setCreateMyBooking(createBooking(bookingData));
  };

  const handleOk = () => {
    setThanks(false);
  };

  const handleCancel = () => {
    setThanks(false);
  };

  return (
    <div>
      <div className="bg-green-100 p-5 items-center">
        <Card
          title="Booking Details"
          bordered={false}
          style={{
            width: "800px",
            borderRadius: "15px",
          }}
          className="shadow-2xl bg-white p-8">
          <h1 className="text-xl font-extrabold text-gray-900 mb-4">
            Room Name: {roomName}
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Selected Date: {bookingDetails.date}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            Start Time: {bookingDetails.startTime}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            End Time: {bookingDetails.endTime}
          </p>
          <p className="text-xl text-gray-700 mb-2">Cost: ${roomCost}</p>
          <p className="text-xl text-gray-700 mb-2">
            User Email: {currentUser?.email}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            User Name: {currentUser?.name}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            Phone: {currentUser?.phone}
          </p>
          <p className="text-xl text-gray-700 mb-4">
            Address: {currentUser?.address}
          </p>

          {/* Confirm Button */}
          <Button
            onClick={showModal}
            className="w-full py-4 text-white bg-red-600 hover:bg-pink-700 rounded-lg text-lg transition-all duration-300">
            Confirm Booking
          </Button>

          {/* Modal */}
          {/* <Modal
            title="Thank You"
            open={thanks}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Close
              </Button>,
            ]}>
            <p>Thank you for your booking!</p>
          </Modal> */}
        </Card>
      </div>

      {/* <h1>{thanks}</h1> */}
      <div>
        <Modal
          title="You have booked successfully"
          open={thanks}
          onOk={handleOk}
          onCancel={handleCancel}>
          {/* booking details */}
          <div className=" bg-red-100  border rounded-lg  p-5 m-5 ">
            <h1 className="font-bold">Room Name: {roomName}</h1>
            <h1 className="font-bold">Selected Date: {bookingDetails.date}</h1>
            <h1 className="font-bold">
              Start time: {bookingDetails.startTime}
            </h1>
            <h1 className="font-bold">End time{bookingDetails.endTime}</h1>
            <h1 className="font-bold">Cost : ${roomCost}</h1>
            <h1 className="font-bold">User email:{currentUser?.email}</h1>
            <h1 className="font-bold">User name:{currentUser?.name}</h1>
            <h1 className="font-bold">phone no:{currentUser?.phone}</h1>
            <h1 className="font-bold">address:{currentUser?.address}</h1>
          </div>
          <div className="text-xl font-bold text-red-700 text-center">
            <h1>---Thank You---</h1>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CheckOut;
