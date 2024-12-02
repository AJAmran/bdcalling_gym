"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { checkUserRole } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const authToken = token || localStorage.getItem("authToken");

    if (!authToken) {
      router.push("/auth/login");
    } else if (!user) {
      dispatch(checkUserRole());
    }
  }, [user, token, dispatch, router]);

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
        <h1>Welcome to the Dashboard!</h1>
      </div>
    </div>
  );
};

export default DashboardPage;
