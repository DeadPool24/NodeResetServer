import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataSource {

    abstract create( createTodoDTO : CreateTodoDTO ): Promise<TodoEntity>;
    //todo: paginación
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findByID(id: number): Promise<TodoEntity|undefined>;
    abstract updateById(updateById : UpdateTodoDTO): Promise<TodoEntity|undefined>;
    abstract deleteById(id: number): Promise<TodoEntity|undefined>;
}