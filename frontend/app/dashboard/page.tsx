"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { FaChartBar, FaUsers, FaCog } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { checkUserRole } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Card from "@/components/card";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const authToken = token || localStorage.getItem("token");

    // If no token, redirect to login
    if (!authToken) {
      router.push("/auth/login");
    } else {
      // If the user is not loaded yet, try to dispatch action to fetch user role
      if (!user && !loading) {
        dispatch(checkUserRole());
      }
    }
  }, [user, token, dispatch, router, loading]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <Header />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Total Users"
            content="1,500"
            icon={<FaUsers />}
            backgroundColor="bg-blue-500"
          />
          <Card
            title="New Orders"
            content="245"
            icon={<FaChartBar />}
            backgroundColor="bg-green-500"
          />
          <Card
            title="Settings"
            content="Manage your settings here"
            icon={<FaCog />}
            backgroundColor="bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
