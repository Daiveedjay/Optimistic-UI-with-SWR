import { tasksUrlEndpoint as cacheKey, fetchTasks } from "./services/api";
import {
  deleteTaskMutation as deleteSingleTask,
  deleteTaskOptions,
  updateTaskMutation as updateSingleTask,
  updateTaskOptions,
} from "./services/swrAPI";

import { FaTrash } from "react-icons/fa";
import Taskform from "./Taskform";
import toast from "react-hot-toast";
import useSWR from "swr";

const userImages = [
  "./user-1.svg",
  "./user-2.svg",
  "./user-3.svg",
  "./user-4.svg",
  "./user-1.svg",
  "./user-2.svg",
  "./user-3.svg",
  "./user-4.svg",
];

export default function TaskContainer() {
  const {
    isLoading,
    error,
    data: tasks,
    mutate,
  } = useSWR(cacheKey, fetchTasks, {
    onSuccess: (data) =>
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  });

  const updateTaskMutation = async (updatedTask) => {
    try {
      await mutate(
        updateSingleTask(updatedTask, tasks),
        updateTaskOptions(updatedTask, tasks)
      );
      toast.success("Successfully updated task");
    } catch (err) {
      toast.error("Failed to update the task.");
    }
  };

  const deleteTaskMutation = async ({ id }) => {
    try {
      await mutate(
        deleteSingleTask({ id }, tasks),
        deleteTaskOptions({ id }, tasks)
      );
      toast.success("Successfully deleted task");
    } catch (err) {
      toast.error("Failed to delete the task.");
    }
  };

  console.log(tasks);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error ❌</div>;

  return (
    <div className="flex flex-col gap-8 p-4">
      <Taskform mutate={mutate} tasks={tasks} />
      <div className="p-4 shadow-lg ">
        <div className="flex flex-col gap-4 ">
          {tasks &&
            tasks?.map((task, index) => {
              return (
                <div
                  key={task.id}
                  className="flex gap-4 items-center py-2 px-6 rounded-md bg-[#74a0a6]">
                  <div>
                    <label
                      htmlFor={`task-${task.id}`}
                      key={task.id}
                      className={`flex gap-4 text-[14px] items-center font-bold list-none p-4 rounded bg-[#88adb3] cursor-pointer hover:bg-[#609299]`}>
                      <div className="inline-flex items-center">
                        <label
                          className="relative flex items-center p-3 rounded-full cursor-pointer"
                          htmlFor="checkbox">
                          <input
                            type="checkbox"
                            name={`task-${task.id}`}
                            id={`task-${task.id}`}
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#edebd9] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-lines checked:bg-[#545240] checked:before:bg-[#edebd9] hover:before:opacity-10 before:checked:hover:before:opacity-10 "
                            checked={task.completed === true}
                            onChange={() =>
                              updateTaskMutation({
                                ...task,
                                completed: !task.completed,
                              })
                            }
                          />
                          <span className="absolute transition-opacity opacity-0 pointer-events-none text-stone-100 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </label>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#161515] ">
                      {task.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#42403f] ">
                      {task.description}
                    </p>
                    <div className="flex gap-2 mt-2 text-xs font-bold">
                      <div className="flex items-center ">
                        <img
                          src={userImages[index]}
                          alt=""
                          className="w-10 h-10 rounded-full "
                        />
                        <span> {task.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-2 ml-auto rounded-full cursor-pointer hover:bg-red-300"
                    onClick={() => deleteTaskMutation({ id: task.id })}>
                    <FaTrash color="#545240" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
