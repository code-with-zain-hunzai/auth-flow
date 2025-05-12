"use client";

import AddTodo from "./AddTodo";
import TodoItem from "./TodoItems";
import { useTodos } from "@/hooks/useTodos";

export default function TodoApp() {
  const {
    todos,
    loading,
    error,
    addTodo,
    toggleComplete,
    updateTodo,
    deleteTodo,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Todo List
        </h1>

        <AddTodo onAdd={addTodo} />

        <div id="todosContainer" className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading todos...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-500">
              No todos yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={toggleComplete}
                onEdit={updateTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
