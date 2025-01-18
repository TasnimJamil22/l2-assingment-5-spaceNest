import React, { useEffect, useState } from "react";
import MeetingRoom from "./MeetingRoom";
import { useGetRoomQuery } from "@/redux/features/rooms/roomApi";
import { Button, Row, Select } from "antd";
// import MeetingRoomDetails from "../MeetingRoomDetails/MeetingRoomDetails";

const MeetingRooms = () => {
  const { data } = useGetRoomQuery("");

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
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rooms: TRoom[] = data?.data ?? [];

  // State for the search term and filtered items
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [capacityFilter, setCapacityFilter] = useState<number>(0);
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [priceOrder, setPriceOrder] = useState<string>("asc");

  const [filteredItems, setFilteredItems] = useState<TRoom[]>(rooms);
  const [originalRooms, setOriginalRooms] = useState([]);

  //search by name
  // Handle input change and filter the array
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
  };
  //filter capacity
  const handleCapacityFilter = (value: number) => {
    setCapacityFilter(value);
    console.log(value);
  };
  //filter price
  const handlePriceFilter = (value: number) => {
    setPriceFilter(value);
    console.log(value);
  };
  // sort price
  const handlePriceOrder = (value: string) => {
    setPriceOrder(value);
    console.log(value);
  };

  //to show data after reload
  useEffect(() => {
    let filtered = rooms;

    // Filter by search term (room name)
    if (searchTerm) {
      filtered = filtered.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filtered);
    }

    // Filter by minimum capacity (greater than or equal filter)
    if (capacityFilter) {
      filtered = filtered.filter((room) => room.capacity >= capacityFilter);

      console.log(filtered);
    }

    //Filter by minimum price (greater than or equal filter)
    if (priceFilter) {
      filtered = filtered.filter((room) => room.pricePerSlot >= priceFilter);

      console.log(filtered);
    }

    // Sort by pricePerSlot (ascending or descending)

    // Create a shallow copy of filtered to avoid modifying the original array
    let sortedFiltered = [...filtered];
    if (priceOrder === "asc") {
      sortedFiltered = sortedFiltered.sort(
        (a, b) => a.pricePerSlot - b.pricePerSlot
      );
    } else if (priceOrder === "dsc") {
      sortedFiltered = sortedFiltered.sort(
        (a, b) => b.pricePerSlot - a.pricePerSlot
      );
    }
    // Set filtered items
    // setFilteredItems(filtered);
    setFilteredItems(sortedFiltered);
  }, [searchTerm, capacityFilter, priceFilter, priceOrder, rooms]);

  //clear filters
  // and get the original rooms
  const clearFilters = () => {
    setSearchTerm("");
    setCapacityFilter(0);
    setPriceFilter(0);
    setPriceOrder("");
    setOriginalRooms(originalRooms);
  };

  return (
    <div>
      {/* Filter Options */}
      <div className="flex justify-start items-center justify-center mx-5 my-5">
        {/* Capacity Filter */}
        <div className="mr-5">
          <p className="text-orange-500"> Search by capacity</p>
          <Select
            placeholder="Select Capacity"
            value={capacityFilter === 0 ? undefined : capacityFilter}
            onChange={handleCapacityFilter}
            style={{ width: 150 }}>
            <Select.Option value={0}>All Capacities</Select.Option>
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={15}>15</Select.Option>
            <Select.Option value={30}>30</Select.Option>
            <Select.Option value={40}>40</Select.Option>
          </Select>
        </div>
        {/* Price Filter */}
        <div className="mr-5">
          <p className="text-orange-500">Search by price</p>
          <Select
            placeholder="Select Price"
            value={priceFilter}
            onChange={handlePriceFilter}
            style={{ width: 150 }}>
            <Select.Option value={0}>All Prices</Select.Option>
            <Select.Option value={100}> $100</Select.Option>
            <Select.Option value={200}> $200</Select.Option>
            <Select.Option value={300}> $300</Select.Option>
            <Select.Option value={400}> $400</Select.Option>
            <Select.Option value={500}> $500</Select.Option>
          </Select>
        </div>

        <div>
          {/* sorting price filter ascending ,descending */}
          <p className="text-orange-500">Select Price Order</p>
          <Select
            placeholder="Select Price"
            value={priceOrder}
            onChange={handlePriceOrder}
            style={{ width: 150 }}>
            <Select.Option value="0">Price (Low to High)</Select.Option>
            <Select.Option value="asc">Price (Low to High)</Select.Option>
            <Select.Option value="dsc">price (High to Low)</Select.Option>
          </Select>
        </div>
      </div>
      {/* clear filters  */}
      <div className="text-center my-5">
        <Button
          onClick={() => {
            clearFilters();
          }}
          className="text-white bg-orange-500 ">
          Clear Filters
        </Button>
      </div>
      {/* search fields */}
      <div className="mx-5">
        <label className="input input-bordered flex justify-between items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
          />

          <Button className="">Search</Button>
        </label>
      </div>
      {/* <div>
        {filteredItems.map((room) => (
          <MeetingRoom key={room._id} room={room} />
        ))}
      </div> */}
      <div>
        {filteredItems && filteredItems?.length > 0 ? (
          <Row gutter={16} style={{ marginTop: 20 }}>
            {filteredItems.map((room) => (
              <MeetingRoom key={room._id} room={room} />
            ))}
          </Row>
        ) : (
          <p className="text-2xl text-center my-5">No rooms found</p>
        )}
      </div>
      {/* <div>
        {filteredItems.map((room) => (
          <MeetingRoomDetails key={room._id} room={room}></MeetingRoomDetails>
        ))}
      </div> */}
    </div>
  );
};

export default MeetingRooms;
