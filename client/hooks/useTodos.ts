import { useEffect, useState } from "react";
import { todoService, Todo } from "../services/todoService";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.fetchTodos();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (value: string) => {
    const newTodo = await todoService.addTodo(value);
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleComplete = async (id: string) => {
    const updated = await todoService.toggleTodoComplete(id);
    setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)));
  };

  const updateTodo = async (id: string, value: string) => {
    const updated = await todoService.updateTodo(id, value);
    setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)));
  };

  const deleteTodo = async (id: string) => {
    await todoService.deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleComplete,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
};
