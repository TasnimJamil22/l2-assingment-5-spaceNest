import { addToCart } from "@/redux/features/booking/bookingSlice";
import { useAppDispatch } from "@/redux/features/hooks";
import { Button, Card } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

type TSlot = {
  _id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};
interface TSlotProps {
  slot: TSlot;
}

const Slot = ({ slot }: TSlotProps) => {
  const { _id, startTime, date, endTime, room } = slot;
  console.log(startTime);
  console.log(date);
  // State to manage if the button is selected or not
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useAppDispatch();

  // Function to handle the toggle
  const toggleButton = () => {
    setIsSelected(!isSelected); // Toggle between true and false

    dispatch(addToCart({ date, room, startTime, endTime }));
    console.log({ _id, date, room, startTime, endTime });
  };
  return (
    <div>
      <Card style={{ width: 300 }} className="bg-green-200 m-2">
        <p className="text-1xl font-bold">Date:{date}</p>
        <p className="text-1xl font-bold">Slot Start Time:{startTime}</p>
        <p className="text-1xl font-bold">Slot End Time:{endTime}</p>
        <Link to="/checkout">
          <Button
            className="bg-blue-500 text-white"
            onClick={toggleButton}
            style={{
              backgroundColor: isSelected ? "#0284c7" : "#047857", // Change button color based on selected state
              color: "white",
            }}>
            {isSelected ? "Selected" : "Select"}
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Slot;
