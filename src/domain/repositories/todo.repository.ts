import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {

    abstract create( createTodoDTO : CreateTodoDTO ): Promise<TodoEntity>;
    //todo: paginación
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findByID(id: number): Promise<TodoEntity>;
    abstract updateById(updateById : UpdateTodoDTO): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;
}