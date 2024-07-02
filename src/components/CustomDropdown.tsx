import React, { useState } from "react";

interface CustomTokenProps {
  rooms: Room[];
  selectedRoom: Room | null;
  setselectedRoom: (token: Room) => void;
}
const CustomDropdown = (props: CustomTokenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (room: Room) => {
    props.setselectedRoom(room);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <div
        className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-md cursor-pointer border border-gray-300 "
        onClick={toggleDropdown}
      >
        <div className="w-full">
          <div className="block text-sm font-medium text-gray-700">
            {props.selectedRoom ? props.selectedRoom.name : "Select Room"}
          </div>
        </div>
        <svg
          className={`w-5 h-5 transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 overflow-auto max-h-56 w-full absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {props.rooms.map((room) => (
            <li
              key={room._id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(room)}
            >
              <span className="block text-sm font-medium text-gray-700">
                {room.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
