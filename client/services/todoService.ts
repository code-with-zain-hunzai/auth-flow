import api from "../lib/api";

export interface Todo {
  _id: string;
  value: string;
  isComplete: boolean;
}

const ENDPOINT = "/todos";

export const todoService = {
  async fetchTodos(): Promise<Todo[]> {
    const response = await api.get(ENDPOINT);
    return response.data;
  },

  async toggleTodoComplete(id: string): Promise<Todo> {
    const response = await api.patch(`${ENDPOINT}/${id}/complete`);
    return response.data;
  },

  async addTodo(value: string): Promise<Todo> {
    const response = await api.post(ENDPOINT, { value });
    return response.data;
  },

  async updateTodo(id: string, value: string): Promise<Todo> {
    const response = await api.put(`${ENDPOINT}/${id}`, { value });
    return response.data;
  },

  async deleteTodo(id: string): Promise<{ message: string }> {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
  },
};
