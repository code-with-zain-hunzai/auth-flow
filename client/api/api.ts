const BASE_URL = "http://localhost:5000/todos";

export interface Todo {
  _id: string;
  value: string;
  isComplete: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch todos");
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function toggleTodoComplete(id: string): Promise<Todo> {
  try {
    const response = await fetch(`${BASE_URL}/${id}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to toggle todo");
    return await response.json();
  } catch (error) {
    console.error("Error toggling todo completion:", error);
    throw error;
  }
}

export async function addTodo(value: string): Promise<Todo> {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) throw new Error("Failed to add todo");
    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}

export async function updateTodo(id: string, value: string): Promise<Todo> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) throw new Error("Failed to update todo");
    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

export async function deleteTodo(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to delete todo");
    return await response.json();
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}
