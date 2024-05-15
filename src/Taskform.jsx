import {
  addTaskMutation as addSingleTask,
  addTaskOptions,
} from "./services/swrAPI";

import toast from "react-hot-toast";
import { useState } from "react";

export default function Taskform({ mutate, tasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const addTaskMutation = async (e) => {
    e.preventDefault();
    const createdAt = new Date().toISOString(); // Get current timestamp as a string

    try {
      await mutate(
        addSingleTask(
          {
            title,
            description,
            assignedTo,
            completed: false,
            createdAt,
          },
          tasks
        ),
        addTaskOptions(
          {
            title,
            description,
            assignedTo,
            completed: false,
            createdAt,
          },
          tasks
        )
      );

      toast.success("Task added succesfully.");
      // setTitle("");
      // setDescription("");
      // setAssignedTo("");
    } catch (err) {
      toast.error("Failed to add the new task.");
    }
  };
  return (
    <div className="bg-[#74a0a6] p-4 rounded-md">
      <form
        className="flex flex-col w-full gap-2 "
        onSubmit={(e) => addTaskMutation(e)}>
        <label htmlFor="title">
          <p className="font-bold ">Title</p>
          <input
            type="text"
            className="w-full font-medium  focus:outline-[#74a0a6] focus-within:outline-[#74a0a6] p-1 bg-transparent border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="description">
          <p className="font-bold ">Description</p>
          <input
            type="text"
            className="w-full font-medium  focus:outline-[#74a0a6] focus-within:outline-[#74a0a6] p-1 bg-transparent border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label htmlFor="assignedTo">
          <p className="font-bold ">Assigned To</p>
          <input
            type="text"
            className="w-full font-medium  focus:outline-[#74a0a6] focus-within:outline-[#74a0a6] p-1 bg-transparent border rounded-md"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </label>
        <button className="p-2 mt-3 border text-white rounded-md w-max hover:bg-white hover:text-[#74a0a6]">
          Add
        </button>
      </form>
    </div>
  );
}
