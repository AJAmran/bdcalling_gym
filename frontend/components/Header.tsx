"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="bg-white shadow-md flex items-center justify-between p-4 fixed w-full top-0 left-0 z-10">
      <h1 className="text-xl font-semibold">Welcome to the Dashboard</h1>
      <div className="flex items-center">
        <div className="mr-4">
          <FaUserCircle className="text-2xl text-gray-600" />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
