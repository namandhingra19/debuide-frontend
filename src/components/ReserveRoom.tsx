import React, { useEffect, useState } from "react";
import { getRooms, reAllocateDefaultData, reserveRoom } from "../services/api";
import CustomDropdown from "./CustomDropdown";
import { LoaderOverlay } from "./LoadingOverlay";

const ReserveRoom: React.FC = () => {
  const [roomType, setRoomType] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleReserve = async () => {
    if (!roomType) return setMessage("Please select a room type");
    else {
      setLoading(true);
      reserveRoom(roomType?._id)
        .then((response) => {
          setLoading(false);
          setMessage(`${roomType.name} room reserved`);
          setResources(response.data.resources);
          fetchRooms();
        })
        .catch((error) => {
          setLoading(false);
          setMessage("Failed to reserve room");
        });
    }
  };

  const reallocateData = async () => {
    setLoading(true);
    reAllocateDefaultData()
      .then((response) => {
        setLoading(false);
        setMessage(response.data.message);
        fetchRooms();
        setResources([]);
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Failed to reallocate data");
      });
  };

  const fetchRooms = async () => {
    setLoading(true);
    getRooms()
      .then((response) => {
        setLoading(false);
        setRooms(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Failed to fetch rooms");
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      {loading && <LoaderOverlay />}

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Hospital Room Reservation</h1>
          <CustomDropdown
            rooms={rooms}
            selectedRoom={roomType}
            setselectedRoom={setRoomType}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={reallocateData}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
            >
              Reallocate Data
            </button>
            <button
              onClick={handleReserve}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Reserve Room
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center text-sm text-gray-600">{message}</div>
          </div>
          <ul>
            {resources.map((resource) => (
              <li key={resource._id}>
                {resource.name}: {resource.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ReserveRoom;
