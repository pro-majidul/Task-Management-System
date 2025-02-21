import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks, setShowPopup, setSelectedCategory, category, setEditTask, handleDeleteTask }) {
    const { setNodeRef } = useDroppable({ id: category });

    return (
        <div ref={setNodeRef} className="w-full max-w-96 bg-white shadow rounded p-4 min-h-20">
            <h2 className="text-lg font-bold mb-2 text-gray-600">{title}</h2>
            <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-6">
                    {tasks.map((task) => (
                        <TaskCard 
                            key={task._id} 
                            task={task} 
                            category={category} 
                            setShowPopup={setShowPopup} 
                            setSelectedCategory={setSelectedCategory} 
                            setEditTask={setEditTask} 
                            handleDeleteTask={handleDeleteTask} 
                        />
                    ))}
                </div>
            </SortableContext>
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
