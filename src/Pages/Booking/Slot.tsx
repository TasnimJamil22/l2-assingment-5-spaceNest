import { Card } from "antd";

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
  const { startTime, date, endTime } = slot;
  console.log(startTime);
  console.log(date);
  return (
    <div>
      <Card style={{ width: 300 }} className="bg-green-200 m-2">
        <p className="text-1xl font-bold">Date:{date}</p>
        <p className="text-1xl font-bold">Slot Start Time:{startTime}</p>
        <p className="text-1xl font-bold">Slot End Time:{endTime}</p>
      </Card>
    </div>
  );
};

export default Slot;
