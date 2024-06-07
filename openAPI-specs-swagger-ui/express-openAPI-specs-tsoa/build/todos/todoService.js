"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
class TodoService {
    get(todoId) {
        console.log("db call to get todos");
        return {
            id: todoId,
            title: "mocked todo",
            description: "mocked todo",
            done: false
        };
    }
    create(todoCreationParams) {
        console.log("db call to post todos");
        return {
            id: "1",
            title: "mocked todo",
            description: "mocked todo",
            done: false
        };
    }
}
exports.TodoService = TodoService;
