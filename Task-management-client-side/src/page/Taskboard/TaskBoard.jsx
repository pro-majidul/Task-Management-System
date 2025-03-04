import { useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import TaskColumn from "../../components/TaskColumn";
export default function TaskBoard() {
    // const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState({ title: "", description: "", category: "To-Do" });
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("To-Do");
    const [editTask, setEditTask] = useState(null);
    const [error, setError] = useState({ title: false, description: false });

    const [tasks, setTasks] = useState({});
    useEffect(() => {
        fetch("https://task-management-server-side-kappa.vercel.app/tasks")
            .then(res => res.json())
            .then(data => {
                const formattedTasks = { "To-Do": [], "In Progress": [], "Done": [] };
                data.forEach(task => {
                    formattedTasks[task.category].push(task);
                });
                setTasks(formattedTasks);
            });
    }, [tasks]);


    const validateInput = (field, value) => {
        if (field === "title") {
            setError((prev) => ({ ...prev, title: value.length > 50 }));
        } else if (field === "description") {
            setError((prev) => ({ ...prev, description: value.length > 200 }));
        }
    };



    // const handleDragEnd = async (event) => {
    //     const { active, over } = event;
    //     console.log(event)
    //     if (!over) return;

    //     const sourceCategory = Object.keys(tasks).find(category =>
    //         tasks[category].some(task => task._id === active.id)
    //     );
    //     const destinationCategory = over.id;

    //     if (!sourceCategory || !destinationCategory || sourceCategory === destinationCategory) return;

    //     const movedTask = tasks[sourceCategory].find(task => task._id === active.id);

    //     await fetch(`https://task-management-server-side-kappa.vercel.app/tasks/${movedTask._id}/category`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ category: destinationCategory }),
    //     });

    //     setTasks({
    //         ...tasks,
    //         [sourceCategory]: tasks[sourceCategory].filter(task => task._id !== active.id),
    //         [destinationCategory]: [...tasks[destinationCategory], { ...movedTask, category: destinationCategory }],
    //     });
    // };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        // Ensure there is a valid drop target
        if (!over) return;

        const sourceCategory = Object.keys(tasks).find((category) =>
            tasks[category].some((task) => task._id === active.id)
        );
        const destinationCategory = over.id;

        if (!sourceCategory || !destinationCategory) return;

        // If the task is dropped in the same category, just reorder
        if (sourceCategory === destinationCategory) {
            const updatedTasks = arrayMove(
                tasks[sourceCategory],
                tasks[sourceCategory].findIndex((task) => task._id === active.id),
                tasks[sourceCategory].findIndex((task) => task._id === over.id)
            );

            setTasks({
                ...tasks,
                [sourceCategory]: updatedTasks
            });

            // Update the server for reordering tasks (if necessary)
            await fetch(`https://task-management-server-side-kappa.vercel.app/tasks/${active.id}/reorder`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    newOrder: updatedTasks.map(task => task._id)
                })
            });

        } else {
            // If task moved to another category, update the category and reorder
            const movedTask = tasks[sourceCategory].find(task => task._id === active.id);

            await fetch(`https://task-management-server-side-kappa.vercel.app/tasks/${movedTask._id}/category`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: destinationCategory })
            });

            // Update UI
            setTasks({
                ...tasks,
                [sourceCategory]: tasks[sourceCategory].filter(task => task._id !== active.id),
                [destinationCategory]: [...tasks[destinationCategory], { ...movedTask, category: destinationCategory }]
            });
        }
    };

    // const handleAddTask = async () => {
    //     if (!newTask.title.trim() || error.title || error.description) return;
    //     const newTaskObj = {
    //         title: newTask.title,
    //         description: newTask.description,
    //         category: selectedCategory,
    //     };

    //     const res = await fetch("https://task-management-server-side-kappa.vercel.app/tasks", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newTaskObj),
    //     });

    //     const data = await res.json();
    //     setTasks({ ...tasks, [selectedCategory]: [...tasks[selectedCategory], data] });
    //     setNewTask({ title: "", description: "", category: "To-Do" });
    //     setShowPopup(false);
    // };
    const handleAddTask = async () => {
        if (!newTask.title.trim() || error.title || error.description) return;
        const newTaskObj = {
            title: newTask.title,
            description: newTask.description,
            category: selectedCategory,
        };

        const res = await fetch("https://task-management-server-side-kappa.vercel.app/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTaskObj),
        });

        const data = await res.json();

        // After adding the task, fetch the latest tasks to ensure synchronization
        const fetchData = await fetch("https://task-management-server-side-kappa.vercel.app/tasks");
        const fetchedTasks = await fetchData.json();
        const formattedTasks = { "To-Do": [], "In Progress": [], "Done": [] };
        fetchedTasks.forEach(task => {
            formattedTasks[task.category].push(task);
        });
        setTasks(formattedTasks);

        setNewTask({ title: "", description: "", category: "To-Do" });
        setShowPopup(false);
    };

    // const handleUpdateTask = async () => {
    //     if (!editTask || !editTask.title.trim() || error.title || error.description) return;

    //     const res = await fetch(`https://task-management-server-side-kappa.vercel.app/tasks/${editTask._id}`, {
    //         method: "PATCH",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(editTask),
    //     });

    //     const updatedTask = await res.json();
    //     setTasks({
    //         ...tasks,
    //         [editTask.category]: tasks[editTask.category].map((task) =>
    //             task._id === updatedTask._id ? updatedTask : task
    //         ),
    //     });

    //     setEditTask(null);
    //     setShowPopup(false);
    // };

    const handleUpdateTask = async () => {
        if (!editTask || !editTask.title.trim() || error.title || error.description) return;

        const res = await fetch(`https://task-management-server-side-kappa.vercel.app/tasks/${editTask._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editTask),
        });

        const updatedTask = await res.json();

        // Update the task in the state locally to reflect changes immediately
        setTasks(prevTasks => {
            // Check if the category exists
            if (!prevTasks[updatedTask.category]) {
                return prevTasks;
            }

            const updatedCategoryTasks = prevTasks[updatedTask.category].map(task =>
                task._id === updatedTask._id ? updatedTask : task
            );

            // Force a re-render by updating the state with new reference
            return {
                ...prevTasks,
                [updatedTask.category]: updatedCategoryTasks,
            };
        });

        setEditTask(null);
        setShowPopup(false);

        // Forcing a re-render after the update
        setTimeout(() => {
            // This timeout ensures React can pick up the state change and re-render
            setTasks({ ...tasks });
        }, 0);
    };




    const handleDeleteTask = async (category, taskId) => {
        await fetch(`https://task-management-server-side-kappa.vercel.app/tasks/${taskId}`, { method: "DELETE" });

        setTasks({
            ...tasks,
            [category]: tasks[category].filter((task) => task._id !== taskId),
        });
    };


    return (
        <section className="bg-gradient-to-r min-h-screen pt-10 from-purple-200 to-blue-200">
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="md:flex gap-4 space-y-2 p-4 w-full max-w-7xl h-auto mx-auto">
                    {/* {Object.keys(tasks).map((category) => (
                        <SortableContext key={category} items={tasks[category].map(task => task._id)} strategy={verticalListSortingStrategy}>
                            <TaskColumn
                                setSelectedCategory={setSelectedCategory}
                                setShowPopup={setShowPopup}
                                title={category}
                                category={category}
                                tasks={tasks[category]}
                                setEditTask={setEditTask}
                                handleDeleteTask={handleDeleteTask}
                            />
                        </SortableContext>
                    ))} */}
                    {Object.keys(tasks).map((category) => (
                        <TaskColumn
                            key={category}
                            setSelectedCategory={setSelectedCategory}
                            setShowPopup={setShowPopup}
                            title={category}
                            category={category}
                            tasks={tasks[category]}
                            setEditTask={setEditTask}
                            handleDeleteTask={handleDeleteTask}
                        />
                    ))}


                    {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h2 className="text-lg text-gray-800 font-bold mb-4">
                                    {editTask ? "Edit Task" : "Add Task"}
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Title (max 50 chars)"
                                    maxLength={50}
                                    value={editTask ? editTask.title : newTask.title}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        validateInput("title", value);
                                        if (editTask) {
                                            setEditTask({ ...editTask, title: value });
                                        } else {
                                            setNewTask({ ...newTask, title: value });
                                        }
                                    }}
                                    className={`border rounded p-2 w-full mb-2 text-black ${error.title ? "border-red-500" : "border-gray-300"}`}
                                />
                                {error.title && <p className="text-red-500 text-sm">Title cannot exceed 50 characters</p>}

                                <textarea
                                    placeholder="Description (max 200 chars)"
                                    maxLength={200}
                                    value={editTask ? editTask.description : newTask.description}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        validateInput("description", value);
                                        if (editTask) {
                                            setEditTask({ ...editTask, description: value });
                                        } else {
                                            setNewTask({ ...newTask, description: value });
                                        }
                                    }}
                                    className={`border text-black rounded p-2 w-full mb-2 ${error.description ? "border-red-500" : "border-gray-300"}`}
                                />
                                {error.description && <p className="text-red-500 text-sm">Description cannot exceed 200 characters</p>}

                                <div className="flex justify-end gap-2">
                                    <button onClick={() => { setShowPopup(false); setEditTask(null); }} className="bg-gray-400 text-white p-2 rounded">Cancel</button>
                                    <button
                                        onClick={editTask ? handleUpdateTask : handleAddTask}
                                        className={`p-2 rounded text-white ${error.title || error.description ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
                                        disabled={error.title || error.description}
                                    >
                                        {editTask ? "Update Task" : "Add Task"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DndContext>
        </section>
    );
}
