import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Form,
  Input,
  TimePicker,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import //   useDeleteRoomMutation,
"@/redux/features/rooms/roomApi"; // Update this to match your actual API hooks
import { useGetAvailableSlotsQuery } from "@/redux/features/booking/bookingApi";
import { useGetRoomQuery } from "@/redux/features/rooms/roomApi";
import {
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} from "@/redux/features/slots/slotsApi";

const SlotListTable = () => {
  const { data, error } = useGetAvailableSlotsQuery({});
  const { data: rooms } = useGetRoomQuery("");
  const [deleteSlot] = useDeleteSlotMutation();
  const [updateSlot] = useUpdateSlotMutation();

  //   const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<TSlot | null>(null);
  const [slotToUpdate, setSlotToUpdate] = useState<TSlot | null>(null);

  // Initializing form using Antd's `useForm`
  const [form] = Form.useForm();

  interface TSlot {
    _id: string;
    room: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }
  const slots: TSlot[] = data?.data ?? [];

  useEffect(() => {
    if (error) {
      message.error("Failed to fetch rooms");
    }
  }, [error]);

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
  const slotRoom: TRoom[] = rooms?.data ?? [];

  // Show delete confirmation modal
  const showDeleteConfirm = (slot: TSlot) => {
    setSlotToDelete(slot);
    setIsDeleteModalVisible(true);
  };

  // Handle delete action
  const handleDelete = () => {
    if (slotToDelete) {
      try {
        deleteSlot(slotToDelete._id);
        message.success("Slot deleted successfully");
      } catch (err) {
        console.log(err);
      }
    }
    setIsDeleteModalVisible(false);
  };
  // Showing update modal with slot details pre-filled
  const showUpdateModal = (slot: TSlot) => {
    setSlotToUpdate(slot);
    form.setFieldsValue({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      room: slot.room,
    });
    setIsUpdateModalVisible(true);
  };

  // Handling update action (submitting the form)
  const handleUpdate = async () => {
    if (slotToUpdate) {
      try {
        const values = await form.validateFields(); // Validating form fields
        const updatedSlot = {
          ...slotToUpdate,
          room: values.room,

          date: values.date,
          startTime: values.startTime,
          endTime: values.endTime,
          isBooked: values.isBooked,
        };
        updateSlot(updatedSlot);
        message.success("Slot updated successfully");
        setIsUpdateModalVisible(false); //closing modal after updating
      } catch (err) {
        console.log(err);
        message.error("Failed to update the slot");
      }
    }
  };

  const handleCancel1 = () => {
    setIsDeleteModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsUpdateModalVisible(false);
  };

  // Columns for the table
  const columns = [
    {
      title: "Room Name",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (text: boolean) => (text ? "Booked" : "Available"),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: undefined, record: TSlot) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            className="text-yellow-600 hover:bg-yellow-100"
            onClick={() => {
              showUpdateModal(record); // Showing update modal
              console.log("Update slot", record);
            }}>
            Update
          </Button>

          <Button
            icon={<DeleteOutlined />}
            className="text-red-600 hover:bg-red-100"
            onClick={() => showDeleteConfirm(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Preparing data for the table
  const slotData = slots.map((slot: TSlot) => {
    // Find the room based on room ID
    const room = slotRoom.find((r: TRoom) => r._id === slot.room);

    return {
      _id: slot._id,
      key: slot._id,
      room: room ? room.name : "Unknown",
      roomNo: room ? room.roomNo : "Unknown",
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked,
    };
  });
  console.log(slotData);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-blue-700">Slot List</h1>
      <Table
        columns={columns}
        dataSource={slotData}
        pagination={false}
        className="bg-white shadow-lg rounded-lg"
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel1}
        okText="Yes, Delete"
        cancelText="Cancel"
        className="text-gray-700">
        <p>Are you sure you want to delete this slot?</p>
      </Modal>

      {/* Update a Slot Modal */}
      <Modal
        title="Update Slot"
        open={isUpdateModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel2}
        okText="Update"
        cancelText="Cancel"
        className="text-gray-700">
        <Form
          form={form}
          layout="vertical"
          name="updateSlotForm"
          initialValues={{
            room: slotToUpdate?.room,
            date: slotToUpdate?.date,
            startTime: slotToUpdate?.startTime,
            endTime: slotToUpdate?.endTime,
          }}>
          <Form.Item label="Room" name="room" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SlotListTable;
