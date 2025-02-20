import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";


// eslint-disable-next-line react/prop-types
export default function TaskColumn({ title, tasks, setShowPopup, setSelectedCategory,category }) {
    const { setNodeRef } = useDroppable({ id: title });

    return (
        <div ref={setNodeRef} className="flex-1 bg-white shadow rounded p-4">
            <h2 className="text-lg font-bold mb-2 text-gray-600">{title}</h2>
            <div className="space-y-2">

                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} setShowPopup={setShowPopup} setSelectedCategory={setSelectedCategory} />
                ))}
            </div>
            <button
                onClick={() => {
                    setSelectedCategory(category);
                    setShowPopup(true);
                }}
                className="flex items-center mt-2 text-blue-500 hover:text-blue-700"
            >
                + Add Task
            </button>
        </div>
    );
}
