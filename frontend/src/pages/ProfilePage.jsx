import React from "react";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { userData } = useAuth();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="mb-4">
            <div className="rounded bg-gray-200 px-4 py-2">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
            </div>
          </div>
          <div className="mb-4">
            <div className="rounded bg-gray-200 px-4 py-2">
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <button className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
              My Rentals
            </button>
            <button className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
              Payment Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
