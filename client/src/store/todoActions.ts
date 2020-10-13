import axios, { AxiosResponse } from "axios"
import { Dispatch } from "redux";

import * as actionTypes from './todoTypes';

const baseUrl: string = "http://localhost:4000"

export const getTodos = (todos: ITodo[]): TActions => {
  return {
    type: actionTypes.GET_ALL_TODOS as string,
    payload: {
      todos,
    }
  }
}

export const addTodo = (todos: ITodo[]): TActions => {
  return {
    type: actionTypes.ADD_TODO,
    payload: {
      todos,
    }
  }
}

export const updateTodo = (todos: ITodo[]) => {
  return {
    type: actionTypes.UPDATE_TODO,
    payload: {
      todos,
    }
  }
}

export const deleteTodo = (todos: ITodo[]) => {
  return {
    type: actionTypes.DELETE_TODO,
    payload: {
      todos,
    }
  }
}

export const fetchTodosFailed = (message: string) => {
  return {
    type: actionTypes.FETCH_TODO_FAILED,
    payload: {
      message
    }
  }
}

export const initTodos = () => {
  return async (dispatch: Dispatch<TActions>): Promise<void> => {
    try {
      const todos: AxiosResponse<ApiDataType> = await axios.get(
        baseUrl + "/todos"
      );
      dispatch(getTodos(todos.data.todos));
    } catch (error) {
      dispatch(fetchTodosFailed(error));
    }
  }
}

export const fetchAddTodo = (formData: ITodo) => {
  return async (dispatch: Dispatch<TActions>): Promise<void> => {
    try {
      const todo: Omit<ITodo, "_id"> = {
        name: formData.name,
        description: formData.description,
        status: false,
      }
      const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/add-todo",
        todo
      )
      dispatch(addTodo(saveTodo.data.todos));
    } catch (error) {
      dispatch(fetchTodosFailed(error));
    }
  }
}

export const fetchDeleteTodo = (_id: string) => {
  return async (dispatch: Dispatch<TActions>): Promise<void> => {
    try {
      const resDeletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-todo/${_id}`
      );
      dispatch(deleteTodo(resDeletedTodo.data.todos));
    } catch (error) {
      dispatch(fetchTodosFailed(error));
    }
  }
}

export const fetchUpdatedTodo = (todo: ITodo) => {
  return async (dispatch: Dispatch<TActions>): Promise<void> => {
    try {
      const todoUpdate: Pick<ITodo, "status"> = {
        status: !todo.status,
      }
      const resUpdatedTodo: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/edit-todo/${todo._id}`,
        todoUpdate
      )
      dispatch(updateTodo(resUpdatedTodo.data.todos));
    } catch (error) {
      dispatch(fetchTodosFailed(error));
    }
  }
}
