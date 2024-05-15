import { useState } from "react";

export default function Taskform() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  return (
    <div className="bg-[#74a0a6] p-4 rounded-md">
      <form className="flex flex-col w-full gap-2 ">
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
