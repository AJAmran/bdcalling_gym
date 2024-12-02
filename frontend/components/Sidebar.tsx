// components/Sidebar.tsx

import React from "react";
import Link from "next/link";
import { FaHome, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-6 fixed top-0 left-0">
      <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>
      <ul className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center text-white hover:text-blue-500"
        >
          <FaHome className="mr-2" /> Home
        </Link>

        <Link
          href="/dashboard/users"
          className="flex items-center text-white hover:text-blue-500"
        >
          <FaUsers className="mr-2" /> Users
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center text-white hover:text-blue-500"
        >
          <FaCog className="mr-2" /> Settings
        </Link>

        <Link
          href="/login"
          className="flex items-center text-white hover:text-red-500"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
