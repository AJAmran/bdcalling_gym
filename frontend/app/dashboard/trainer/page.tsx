"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer,
} from "@/redux/slices/trainerSlice";
import { toast } from "react-hot-toast";

const ManageTrainers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trainers, loading, error } = useAppSelector(
    (state) => state.trainers
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editId) {
      dispatch(updateTrainer({ id: editId, data: formData }));
      toast.success("Trainer updated successfully!");
    } else {
      dispatch(addTrainer(formData));
      toast.success("Trainer added successfully!");
    }
    setFormData({ name: "", email: "", phone: "", specialty: "" });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (trainer: any) => {
    setFormData({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      specialty: trainer.specialty,
    });
    setIsEditing(true);
    setEditId(trainer.id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTrainer(id));
    toast.success("Trainer deleted successfully!");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Manage Trainers</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={formData.specialty}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Add"} Trainer</button>
      </form>

      <ul>
        {trainers.map((trainer) => (
          <li key={trainer.id}>
            <p>{trainer.name}</p>
            <p>{trainer.email}</p>
            <p>{trainer.phone}</p>
            <p>{trainer.specialty}</p>
            <button onClick={() => handleEdit(trainer)}>Edit</button>
            <button onClick={() => handleDelete(trainer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTrainers;
