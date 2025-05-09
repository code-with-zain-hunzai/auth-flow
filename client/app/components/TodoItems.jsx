"use client";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const handleEdit = async () => {
    const newVal = prompt("Edit todo:", todo.value);
    if (newVal) {
      onEdit(todo._id, newVal);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 p-4 bg-white shadow rounded-md mb-2">
      <span
        onClick={() => onToggle(todo._id)}
        className={`flex-grow cursor-pointer text-gray-800 ${
          todo.isComplete ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.value}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(todo._id)}
          className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          {todo.isComplete ? "Undo" : "Complete"}
        </button>

        <button
          onClick={handleEdit}
          className="text-sm px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(todo._id)}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
