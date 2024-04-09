import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";

let todos = [
    { id: 1, text: 'Comprar leche', fecha: new Date() },
    { id: 2, text: 'Comprar manzanas', fecha: null },
    { id: 3, text: 'Comprar agua', fecha: new Date() }
];

export class TodosController {

    //* DI
    constructor() { }

    public getTodos = async (request: Request, response: Response) => {

        const todos = await prisma.todo.findMany();

        response.json(todos);
    }

    public getTodosById = async (request: Request, response: Response) => {

        const id = +request.params.id;

        if (isNaN(id)) return response.status(400).json({ error: `El argumento ID no es valido` });

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todo) return response.status(404).json({ error: `Todo con ID ${id} no encontrado` });

        response.json(todo);
    }

    public postTodo = async (request: Request, response: Response) => {

        const [error, createTodoDto] = CreateTodoDTO.create(request.body);

        if (error) return response.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        response.json(todo);
    }

    public putTodo = async (request: Request, response: Response) => {
        const id = +request.params.id;
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...request.body, id });

        if (error) return response.status(400).json({ error });

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todo) return response.status(404).json({ error: `Todo con ID ${id} no encontrado` });

        const todoUpdated = await prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDTO!.values
        });

        response.json(todoUpdated);
    }

    public deleteTodosById = async (request: Request, response: Response) => {

        const id = +request.params.id;

        if (isNaN(id)) return response.status(400).json({ error: `El argumento ID no es valido` });

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todo) return response.status(404).json({ error: `Todo con ID ${id} no encontrado` });

        const todoRemoved = await prisma.todo.deleteMany({
            where: {
                id: id
            }
        });

        response.json({ todo, todoRemoved });
    }

}
