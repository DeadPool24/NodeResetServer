import { prisma } from "../../data/postgres";
import { CreateTodoDTO, TodoDataSource, UpdateTodoDTO } from "../../domain";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDataSourceImp implements TodoDataSource {

    async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });
        return TodoEntity.fromJson(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromJson(todo));
    }

    async findByID(id: number): Promise<TodoEntity | undefined> {
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        if (!todo) throw `Todo con id ${id} no encontrado`
        return TodoEntity.fromJson(todo);
    }

    async updateById(updateById: UpdateTodoDTO): Promise<TodoEntity | undefined> {
        await this.findByID(updateById.id);
        const todoUpdated = await prisma.todo.update({
            where: {
                id: updateById.id
            },
            data: updateById!.values
        });

        return TodoEntity.fromJson(todoUpdated);
    }

    async deleteById(id: number): Promise<TodoEntity | undefined> {
        await this.findByID(id);
        const todoRemoved = await prisma.todo.deleteMany({
            where: {
                id: id
            }
        });
        return TodoEntity.fromJson(todoRemoved);
    }

}