import { Request, Response } from "express";
import { todo } from "node:test";

let todos = [
    { id: 1, text: 'Comprar leche', fecha: new Date() },
    { id: 2, text: 'Comprar manzanas', fecha: null },
    { id: 3, text: 'Comprar agua', fecha: new Date() }
];

export class TodosController {

    //* DI
    constructor() { }

    public getTodos = (request: Request, response: Response) => {
        response.json(todos);
    }

    public getTodosById = (request: Request, response: Response) => {

        const id = +request.params.id;

        if (isNaN(id)) return response.status(400).json({ error: `El argumento ID no es valido` });

        const todo = todos.find(todo => todo.id == id);
        (todo)
            ? response.json(todo)
            : response.status(404).json({ error: `Todo con ID ${request.params.id} no encontrado` });
    }

    public postTodo = (request: Request, response: Response) => {
        const { text, fecha } = request.body;

        if (!text) return response.status(400).json({ error: `El argumento texto es requerido` });

        const newTodo = {
            id: todos.length + 1,
            text: text,
            fecha: fecha
        };

        todos.push(newTodo);

        response.json(todos);
    }

    public putTodo = (request: Request, response: Response) => {
        const { text, fecha } = request.body;

        const id = +request.params.id;
        if (isNaN(id)) return response.status(400).json({ error: `El argumento ID no es valido` });

        const todo = todos.find(todo => todo.id == id);

        (todo)
            ? response.json(todo)
            : response.status(404).json({ error: `Todo con ID ${request.params.id} no encontrado` });

        const newTodo = {
            id: id,
            text: text,
            fecha: fecha
        };

        todos = todos.filter(m => m.id != id);
        todos.push(newTodo);
        response.json(todos);
    }

    public deleteTodosById = (request: Request, response: Response) => {

        const id = +request.params.id;

        if (isNaN(id)) return response.status(400).json({ error: `El argumento ID no es valido` });

        const todo = todos.find(todo => todo.id == id);
        (todo)
            ? response.json(todo)
            : response.status(404).json({ error: `Todo con ID ${request.params.id} no encontrado` });
        todos = todos.filter(m => m.id != id);
        
        response.json(todos);
    }

}
