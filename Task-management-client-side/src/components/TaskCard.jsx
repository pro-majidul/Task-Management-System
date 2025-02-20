import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// eslint-disable-next-line react/prop-types
export default function TaskCard({ task, setEditTask, handleDeleteTask, setShowPopup }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task?.id });

    return (
        <div
            ref={setNodeRef}
            className={`bg-gray-200 p-2 rounded shadow cursor-pointer transition-all 
                ${isDragging ? "opacity-50 scale-105 shadow-lg z-50" : ""}`}
            style={{
                transform: transform ? CSS.Translate.toString(transform) : "none",
            }}
        >
            {/* Draggable Area */}
            <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
                <h3 className="font-semibold text-gray-500">{task.title}</h3>
            </div>
            
            <p className="text-sm text-gray-600">{task.description}</p>
            
            <div className="flex items-center justify-between my-2">
                <button
                    onClick={() => {
                        setEditTask(task); // Correctly setting the task
                        setShowPopup(true);
                    }}
                    className="text-gray-600 hover:text-black cursor-pointer"
                >
                    Update
                </button>
                <button
                    onClick={() => handleDeleteTask(task.category, task.id)}
                    className="text-gray-600 hover:text-red-500 cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
