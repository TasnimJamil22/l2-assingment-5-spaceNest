import { useGetRoomQuery } from "@/redux/features/rooms/roomApi";
import { useCreateSlotMutation } from "@/redux/features/slots/slotsApi";

import { useForm } from "react-hook-form";

const CreateSlotsForm = () => {
  const [createSlot, { error }] = useCreateSlotMutation();
  const { data } = useGetRoomQuery(undefined);

  interface TRoom {
    _id: string;
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    isDeleted: boolean;
  }
  const rooms: TRoom[] = data?.data ?? [];

  console.log(error);
  const { register, handleSubmit } = useForm<FormData>({});

  interface FormData {
    room: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }

  const onSubmit = async (info: FormData) => {
    try {
      const slotInfo = {
        room: info.room,
        date: info.date,
        startTime: info.startTime,
        endTime: info.endTime,
        isBooked: false,
      };
      await createSlot(slotInfo);
      console.log("Slot created successfully:", slotInfo);
    } catch (error) {
      console.error("slot not createrd", error); // Handle login errors (show a message)
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
        {/* Room Selection Dropdown */}
        <div>
          <label
            htmlFor="roomId"
            className="block text-lg font-semibold text-gray-700">
            Select Room
          </label>
          <select
            id="room"
            {...register("room")}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label
            htmlFor="roomName"
            className="block text-lg font-semibold text-gray-700">
            Room Name
          </label>
          <input
            type="text"
            id="roomName"
            {...register("room")}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Room Name"
          />
        </div> */}

        <div>
          <label
            htmlFor="date"
            className="block text-lg font-semibold text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Select a Date"
          />
        </div>

        <div>
          <label
            htmlFor="startTime"
            className="block text-lg font-semibold text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            {...register("startTime")}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Select Start Time"
          />
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="block text-lg font-semibold text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            {...register("endTime")}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Select End Time"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSlotsForm;
