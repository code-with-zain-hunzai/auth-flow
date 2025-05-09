"use client";

import { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItems";
import {
  fetchTodos,
  addTodo,
  toggleTodoComplete,
  updateTodo,
  deleteTodo,
} from "@/api/api";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      setLoading(true);
      const todoList = await fetchTodos();
      setTodos(todoList);
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTodo(value) {
    try {
      await addTodo(value);
      loadTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }

  async function handleToggleTodo(id) {
    try {
      await toggleTodoComplete(id);
      loadTodos();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  }

  async function handleUpdateTodo(id, value) {
    try {
      await updateTodo(id, value);
      loadTodos();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  }

  async function handleDeleteTodo(id) {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Todo List
        </h1>

        <AddTodo onAdd={handleAddTodo} />

        <div id="todosContainer" className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-500">
              No todos yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggleTodo}
                onEdit={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
