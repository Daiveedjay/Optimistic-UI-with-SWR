import axios from "axios";

const tasksApi = axios.create({
  baseURL: "http://localhost:3500",
});

export const tasksUrlEndpoint = "/tasks";

// const delay = () => new Promise((res) => setTimeout(() => res(), 1200));

export const fetchTasks = async () => {
  // await delay();
  const response = await tasksApi.get(tasksUrlEndpoint);
  return response.data;
};

export const addSingleTask = async ({
  title,
  description,
  completed,
  assignedTo,
  createdAt,
}) => {
  // await delay();
  // if (Math.random() < 0.5) throw new Error("Failed to add new task");
  const response = await tasksApi.post(tasksUrlEndpoint, {
    title,
    description,
    completed,
    assignedTo,
    createdAt,
  });
  return response.data;
};

export const updateSingleTask = async (task) => {
  // await delay();
  // if (Math.random() < 0.5) throw new Error("Failed to update task");
  const response = await tasksApi.patch(`${tasksUrlEndpoint}/${task.id}`, task);
  return response.data;
};

export const deleteSingleTask = async ({ id }) => {
  // await delay();
  // if (Math.random() < 0.5) throw new Error("Failed to update task");
  return await tasksApi.delete(`${tasksUrlEndpoint}/${id}`, id);
};
