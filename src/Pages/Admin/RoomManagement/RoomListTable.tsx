import { Table, Button, Space, Modal, message } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useGetRoomQuery,
  //   useDeleteRoomMutation,
} from "@/redux/features/rooms/roomApi"; // Update this to match your actual API hooks

interface Room {
  key: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
}

const RoomListTable = () => {
  const { data: rooms, error, isLoading } = useGetRoomQuery({});
  //   const [deleteRoom] = useDeleteRoomMutation(); // Assuming delete room mutation is available
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  console.log(isModalVisible);

  useEffect(() => {
    if (error) {
      message.error("Failed to fetch rooms");
    }
  }, [error]);

  //   // Show delete confirmation modal
  //   const showDeleteConfirm = (room: Room) => {
  //     setRoomToDelete(room);
  //     setIsModalVisible(true);
  //   };

  // Handle delete action
  //   const handleDelete = async () => {
  //     if (roomToDelete) {
  //       try {
  //         await deleteRoom(roomToDelete.key); // Delete room by its key (ID)
  //         message.success("Room deleted successfully");
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     setIsModalVisible(false);
  //   };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Columns for the table
  const columns = [
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Floor No.",
      dataIndex: "floorNo",
      key: "floorNo",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Price per Slot",
      dataIndex: "pricePerSlot",
      key: "pricePerSlot",
      render: (text: number) => `$${text}`,
    },
    {
      title: "Actions",
      key: "action",
      render: (_: undefined, record: Room) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            className="text-yellow-600 hover:bg-yellow-100"
            onClick={() => {
              console.log("Update room", record);
            }}>
            Update
          </Button>
          <Button>Delete</Button>
          {/* <Button
            icon={<DeleteOutlined />}
            
            className="text-red-600 hover:bg-red-100"
            onClick={() => showDeleteConfirm(record)}>
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  // Handling loading and empty state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!rooms || rooms.length === 0) {
    return <div>No rooms available.</div>;
  }

  // Preparing data for the table
  const roomData = rooms.map((room: Room) => ({
    key: room.key,
    name: room.name,
    roomNo: room.roomNo,
    floorNo: room.floorNo,
    capacity: room.capacity,
    pricePerSlot: room.pricePerSlot,
  }));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-blue-700">Room List</h1>
      <Table
        columns={columns}
        dataSource={roomData}
        pagination={false}
        className="bg-white shadow-lg rounded-lg"
      />

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        //   visible={isModalVisible}
        //   onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
        className="text-gray-700">
        <p>Are you sure you want to delete this room?</p>
      </Modal>
    </div>
  );
};

export default RoomListTable;
