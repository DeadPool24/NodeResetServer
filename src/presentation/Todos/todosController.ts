import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController {

    //* DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = (request: Request, response: Response) => {
        new GetTodos(this.todoRepository)
        .execute()
        .then(todos => response.json(todos))
        .catch(error => response.status(400).json({error}));
    }

    public getTodosById = (request: Request, response: Response) => {
        const id = +request.params.id;
        if (isNaN(id)) return response.status(400).json({ error: `El argumento ID no es valido` });

        new GetTodo(this.todoRepository)
        .execute(id)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({error}));
    }

    public postTodo = (request: Request, response: Response) => {
        const [error, createTodoDto] = CreateTodoDTO.create(request.body);
        if (error) return response.status(400).json({ error });
        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({error}));
    }

    public putTodo = (request: Request, response: Response) => {
        const id = +request.params.id;
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...request.body, id });
        if (error) return response.status(400).json({ error });
        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDTO!)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({error}));
    }

    public deleteTodosById = (request: Request, response: Response) => {
        const id = +request.params.id;
        if (isNaN(id)) return response.status(400).json({ error: `El argumento ID no es valido` });
        new DeleteTodo(this.todoRepository)
        .execute(id!)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({error}));

    }

}
