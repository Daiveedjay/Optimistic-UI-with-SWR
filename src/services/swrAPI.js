import { addSingleTask, deleteSingleTask, updateSingleTask } from "./api";

export const addTaskMutation = async (newTask, tasks) => {
  const addedTask = await addSingleTask(newTask);
  return [...tasks, addedTask].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const addTaskOptions = (newTask, tasks) => {
  return {
    optimisticData: [...tasks, newTask].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

// Function for updating a task
export const updateTaskMutation = async (updatedTask, tasks) => {
  const updatedTaskResponse = await updateSingleTask(updatedTask);
  return tasks.map((task) =>
    task.id === updatedTask.id ? updatedTaskResponse : task
  );
};

// Options for updating a task
export const updateTaskOptions = (updatedTask, tasks) => {
  return {
    optimisticData: tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

// Function for deleting a task
export const deleteTaskMutation = async (taskToDelete, tasks) => {
  await deleteSingleTask(taskToDelete);
  return tasks.filter((task) => task.id !== taskToDelete.id);
};

// Options for deleting a task
export const deleteTaskOptions = (taskToDelete, tasks) => {
  return {
    optimisticData: tasks.filter((task) => task.id !== taskToDelete.id),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
