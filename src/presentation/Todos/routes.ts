import { Router } from "express";
import { TodosController } from "./todosController";

export class TodosRoutes {

    static get routes(): Router {

        const router = Router();

        const todosController = new TodosController();

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodosById);
        router.post('/', todosController.postTodo);
        router.put('/:id', todosController.putTodo);
        router.delete('/:id', todosController.deleteTodosById);

        return router;
    }

}