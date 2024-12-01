"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.role !== "admin") {
    return <p>Unauthorized Access</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p>Welcome, {user.id}!</p>
    </div>
  );
};

export default AdminDashboard;
