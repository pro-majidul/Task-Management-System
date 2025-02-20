import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-gray-200 p-2 rounded shadow cursor-pointer"
      style={{ transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "none" }}
    >
      <h3 className="font-semibold text-gray-500">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
}
