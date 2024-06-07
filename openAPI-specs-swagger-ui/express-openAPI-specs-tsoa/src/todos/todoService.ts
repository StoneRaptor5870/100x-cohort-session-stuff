import { Todo } from "./todo";

export type TodoCreationParams = Pick<Todo, "title" | "description">

export class TodoService {
  public get(todoId: string): Todo {
    console.log("db call to get todos");
    return {
      id: todoId,
      title: "mocked todo",
      description: "mocked todo",
      done: false
    }
  }

  public create(todoCreationParams: TodoCreationParams): Todo {
    console.log("db call to post todos");
    return {
      id: "1",
      title: "mocked todo",
      description: "mocked todo",
      done: false
    }
  }
}