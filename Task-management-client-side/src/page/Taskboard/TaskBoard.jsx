import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import TaskColumn from "../../components/TaskColumn";

const initialTasks = {
    "To-Do": [
        { id: 1, title: "Sample Task 1", description: "Task description", timestamp: Date.now(), category: "To-Do" },
    ],
    "In Progress": [
        { id: 2, title: "Sample Task 2", description: "Task description", timestamp: Date.now(), category: "In Progress" },
    ],
    "Done": [
        { id: 3, title: "Sample Task 3", description: "Task description", timestamp: Date.now(), category: "Done" },
    ],
};

export default function TaskBoard() {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState({ title: "", description: "", category: "To-Do" });
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("To-Do");

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const sourceCategory = Object.keys(tasks).find((category) =>
            tasks[category].some((task) => task.id === active.id)
        );
        const destinationCategory = over.id;

        if (!sourceCategory || !destinationCategory) return;

        if (sourceCategory === destinationCategory) {
            const updatedTasks = arrayMove(
                tasks[sourceCategory],
                tasks[sourceCategory].findIndex((task) => task.id === active.id),
                tasks[destinationCategory].findIndex((task) => task.id === over.id)
            );
            setTasks({ ...tasks, [sourceCategory]: updatedTasks });
        } else {
            const movedTask = tasks[sourceCategory].find((task) => task.id === active.id);
            movedTask.category = destinationCategory;
            setTasks({
                ...tasks,
                [sourceCategory]: tasks[sourceCategory].filter((task) => task.id !== active.id),
                [destinationCategory]: [...tasks[destinationCategory], movedTask],
            });
        }
    };

    const handleAddTask = () => {
        if (!newTask.title.trim()) return;
        const newTaskObj = {
            id: Date.now(),
            title: newTask.title,
            description: newTask.description,
            timestamp: Date.now(),
            category: selectedCategory,
        };
        setTasks({ ...tasks, [selectedCategory]: [...tasks[selectedCategory], newTaskObj] });
        setNewTask({ title: "", description: "", category: "To-Do" });
        setShowPopup(false);
    };
    return (
        <section className="bg-gradient-to-r h-screen pt-10 from-purple-200 to-blue-200">
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="flex flex-col md:flex-row gap-4 p-4   w-full max-w-7xl h-auto mx-auto">
                    {Object.keys(tasks).map((category) => (
                        <SortableContext key={category} items={tasks[category]} strategy={verticalListSortingStrategy}>
                            <TaskColumn setSelectedCategory={setSelectedCategory} setShowPopup={setShowPopup} title={category} category={category} tasks={tasks[category]} />

                        </SortableContext>
                    ))}

                    {/* Task Add Popup */}
                    {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h2 className="text-lg text-gray-800 font-bold mb-4">Add Task</h2>
                                <input
                                    type="text"
                                    placeholder="Title (max 50 chars)"
                                    maxLength={50}
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="border rounded text-gray-800 p-2 w-full mb-2"
                                />
                                <textarea
                                    placeholder="Description (max 200 chars)"
                                    maxLength={200}
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="border rounded p-2 text-gray-800 w-full mb-2"
                                />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border rounded text-gray-800 p-2 w-full mb-2"
                                >
                                    <option value="To-Do">To-Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowPopup(false)} className="bg-gray-400 text-white p-2 rounded">Cancel</button>
                                    <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DndContext>
        </section>
    );
}
