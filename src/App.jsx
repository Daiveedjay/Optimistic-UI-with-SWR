import TaskContainer from "./TaskContainer";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <main className=" bg-[#e0dbbd]  gap-4 min-h-[100dvh] flex justify-center items-center flex-col">
      <h1 className="text-3xl ">My Task App</h1>

      <TaskContainer />
      <Toaster />
    </main>
  );
}
