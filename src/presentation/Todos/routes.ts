import { Router } from "express";
import { TodosController } from "./todosController";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository";
import { TodoDataSourceImp } from "../../infraestructure/datasource/todo.datasource";

export class TodosRoutes {

    static get routes(): Router {

        const router = Router();

        const dataSource  =  new TodoDataSourceImp();
        const todoRepository = new TodoRepositoryImpl(dataSource);
        const todosController = new TodosController(todoRepository);

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodosById);
        router.post('/', todosController.postTodo);
        router.put('/:id', todosController.putTodo);
        router.delete('/:id', todosController.deleteTodosById);

        return router;
    }

}