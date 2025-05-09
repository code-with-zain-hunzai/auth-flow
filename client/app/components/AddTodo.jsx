"use client";

import { useState } from "react";

export default function AddTodo({ onAdd }) {
  const [value, setValue] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="input-container flex items-center gap-2 p-4 bg-white shadow-md rounded-lg w-full max-w-md mx-auto"
    >
      <input
        id="todoInput"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        id="addTodoButton"
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Todo
      </button>
    </form>
  );
}