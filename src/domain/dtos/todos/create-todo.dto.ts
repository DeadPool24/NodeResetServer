
export class CreateTodoDTO {

    constructor(
        public readonly text: string,
        public readonly fecha: Date
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {

        const { text, fecha } = props;

        if (!text) return ['Text property is required', undefined];

        return [undefined, new CreateTodoDTO(text, new Date(fecha))];
    }

}