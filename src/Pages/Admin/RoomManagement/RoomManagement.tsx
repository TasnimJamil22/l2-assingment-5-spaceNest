import { useAddRoomMutation } from "@/redux/features/rooms/roomApi";
import { Button, Checkbox, Form, Input, InputNumber, Space } from "antd";
import { useState } from "react";
import RoomList from "./RoomList";

const RoomManagement = () => {
  const [createRoom, setCreateRoom] = useState<RoomFormValues | null>(null); // Initialize as null
  console.log(createRoom);
  const [addRoom, { error }] = useAddRoomMutation();
  console.log(error);

  // For amenities (Checkbox to select multiple amenities)
  const [amenities, setAmenities] = useState<string[]>([]);

  // Handle change for amenities (checkbox selection)
  const onAmenitiesChange = (checkedValues: string[]) => {
    setAmenities(checkedValues);
  };
  interface RoomFormValues {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
  }

  const [form] = Form.useForm<RoomFormValues>(); // Ant Design form instance

  // Handle form submission
  const onFinish = async (values: RoomFormValues) => {
    const newRoom = {
      name: values.name,
      roomNo: values.roomNo,
      floorNo: values.floorNo,
      capacity: values.capacity,
      pricePerSlot: values.pricePerSlot,
      amenities: amenities,
      isDeleted: false,
    };
    try {
      const result = await addRoom(newRoom);
      setCreateRoom(result.data);
      console.log(result.data);
    } catch (err) {
      console.error("Room creation failed:", err);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Add New Room</h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ amenities: [] }} // Initialize with empty amenities
        >
          {/* Room Name */}
          <Form.Item
            label="Room Name"
            name="name"
            rules={[
              { required: true, message: "Please input the room name!" },
            ]}>
            <Input />
          </Form.Item>

          {/* Room Number */}
          <Form.Item
            label="Room Number"
            name="roomNo"
            rules={[
              { required: true, message: "Please input the room number!" },
            ]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          {/* Floor Number */}
          <Form.Item
            label="Floor Number"
            name="floorNo"
            rules={[
              { required: true, message: "Please input the floor number!" },
            ]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          {/* Capacity */}
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please input the capacity!" }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          {/* Price per Slot */}
          <Form.Item
            label="Price per Slot"
            name="pricePerSlot"
            rules={[
              { required: true, message: "Please input the price per slot!" },
            ]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          {/* Amenities (Multiple selection with Checkboxes) */}
          <Form.Item label="Amenities" name="amenities">
            <Checkbox.Group
              options={[
                "Wi-Fi",
                "Projector",
                "AC",
                "Whiteboard",
                "Coffee",
                "Chairs",
              ]}
              value={amenities}
              onChange={onAmenitiesChange}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Room
              </Button>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      {/* Room list table */}
      <RoomList />
    </div>
  );
};

export default RoomManagement;
