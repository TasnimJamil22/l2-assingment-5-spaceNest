import { useGetAvailableSlotsQuery } from "@/redux/features/booking/bookingApi";

import { DatePicker, Space, type DatePickerProps } from "antd";
import Slot from "./Slot";
import { useEffect, useState } from "react";

import UserForm from "./UserForm";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
//date picker
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};
console.log("1:", onChange);

const Booking = () => {
  // const [ {data:user,error}] = useLoginMutation();
  const { data } = useGetAvailableSlotsQuery(undefined);
  const [availableSlots, setAvailableSlots] = useState<TSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  type TSlot = {
    _id: string;
    room: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots: TSlot[] = data?.data ?? [];

  //we are extracting date string from onChange.
  const onChange = (date: Date | null) => {
    if (date) {
      // Converting moment to string in the format 'YYYY-MM-DD'

      const dateString = date.toISOString().split("T")[0];
      //   const dateString = date.toLocaleDateString("en-CA"); // 'en-CA' gives you the date format 'YYYY-MM-DD'
      console.log("selected date:", dateString);
      setSelectedDate(dateString);

      //comparing the input date with available date from slots array
      //find() is used to return the first element that satisfies the given condition
      //filter() is used to filter and return all elements that satisfy a given condition

      //   const filteredSlots = slots.filter((slot) => selectedDate === slot.date);
      //   console.log(filteredSlots);
      //   setAvailableSlots(filteredSlots);
    }
  };

  // useEffect to filter available slots whenever the selectedDate or slots change
  useEffect(() => {
    if (selectedDate && slots.length > 0) {
      const filteredSlots = slots.filter((slot) => selectedDate === slot.date);
      console.log("Filtered slots:", filteredSlots);
      setAvailableSlots(filteredSlots);
    }
  }, [selectedDate, slots]); // Depend on selectedDate and slots

  return (
    <div className="text-center">
      {/* date picker */}
      <Space
        direction="vertical"
        className="bg-green-100 w-64 h-24 items-center justify-center border rounded-lg">
        <DatePicker onChange={onChange} className="w-56" />
      </Space>

      {/* slots  map*/}
      <div className="flex justify-center items-center">
        {availableSlots && availableSlots.length > 0 ? (
          availableSlots.map((slot) => <Slot key={slot._id} slot={slot} />)
        ) : (
          <p className="text-2xl text-center ">No slots found</p>
        )}
      </div>

      {/* predefined user form */}
      <UserForm></UserForm>
    </div>
  );
};

export default Booking;
