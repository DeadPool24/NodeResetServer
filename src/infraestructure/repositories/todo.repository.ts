import { CreateTodoDTO, TodoDataSource, TodoRepository, UpdateTodoDTO } from "../../domain";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoRepositoryImpl implements TodoRepository{

constructor(
    private readonly datasource : TodoDataSource
){}

    create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
       return this.datasource.create(createTodoDTO);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findByID(id: number): Promise<TodoEntity> {
        return this.datasource.findByID(id);
    }
    updateById(updateById: UpdateTodoDTO): Promise<TodoEntity> {
        return this.datasource.updateById(updateById);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}