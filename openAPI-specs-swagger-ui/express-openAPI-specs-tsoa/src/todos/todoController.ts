import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { Todo } from "./todo";
import { TodoService, TodoCreationParams } from "./todoService";

@Route("todo")
export class TodoController extends Controller {
  /**
   * Retrieves the details of an todo.
   * Supply the unique user ID from either and receive corresponding todo details.
   */
  @Get("{todoId}")
  public async getTodo(
    @Path() todoId: string,
  ): Promise<Todo> {
    return new TodoService().get(todoId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: TodoCreationParams
  ): Promise<void> {
    this.setStatus(201);
    new TodoService().create(requestBody);
    return;
  }
}