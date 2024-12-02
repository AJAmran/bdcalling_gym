"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSchedules, addSchedule } from "@/redux/slices/scheduleSlice";
import { fetchTrainers } from "@/redux/slices/trainerSlice";
import { toast } from "react-hot-toast";

const ClassScheduling: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    schedules,
    loading: schedulesLoading,
    error: schedulesError,
  } = useAppSelector((state) => state.schedules);
  const {
    trainers,
    loading: trainersLoading,
    error: trainersError,
  } = useAppSelector((state) => state.trainers);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: 2,
    trainerId: "",
  });

  useEffect(() => {
    dispatch(fetchSchedules());
    dispatch(fetchTrainers());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSchedule = () => {
    const daySchedules = schedules.filter(
      (schedule) => schedule.date === formData.date
    );

    // Validate maximum schedules per day
    if (daySchedules.length >= 5) {
      toast.error("A maximum of 5 schedules is allowed per day.");
      return false;
    }

    // Validate overlapping schedules
    const newStartTime = new Date(`${formData.date}T${formData.time}`);
    const newEndTime = new Date(newStartTime);
    newEndTime.setHours(newEndTime.getHours() + formData.duration);

    for (const schedule of daySchedules) {
      const existingStartTime = new Date(`${schedule.date}T${schedule.time}`);
      const existingEndTime = new Date(existingStartTime);
      existingEndTime.setHours(existingEndTime.getHours() + schedule.duration);

      if (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime)
      ) {
        toast.error("Schedule overlaps with an existing class.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSchedule()) {
      dispatch(addSchedule(formData));
      toast.success("Class scheduled successfully!");
      setFormData({
        date: "",
        time: "",
        duration: 2,
        trainerId: "",
      });
    }
  };

  if (schedulesLoading || trainersLoading) return <div>Loading...</div>;
  if (schedulesError || trainersError)
    return <div>Error: {schedulesError || trainersError}</div>;

  return (
    <div>
      <h1>Class Scheduling</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          min={1}
          max={2}
          onChange={handleInputChange}
          required
        />
        <select
          name="trainerId"
          value={formData.trainerId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Schedule</button>
      </form>

      <h2>Existing Schedules</h2>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            <p>
              {schedule.date} | {schedule.time} - {schedule.duration} hour(s)
            </p>
            <p>
              Trainer: {trainers.find((t) => t.id === schedule.trainerId)?.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassScheduling;
