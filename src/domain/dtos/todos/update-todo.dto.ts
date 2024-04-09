
export class UpdateTodoDTO {

    constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly fecha?: Date
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};
        if (this.text) returnObj.text = this.text;
        if (this.fecha) returnObj.fecha = new Date(this.fecha);
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {

        const { id, text, fecha } = props;
        let nuevaFecha = fecha;

        if (!id || isNaN(Number(id))) {
            return ['Id incorrecto'];
        }

        if (fecha) {
            const nuevaFecha = new Date(fecha);
            if (nuevaFecha.toString() === 'Invalid Date') {
                return ['Fecha incorrecta'];
            }
        }

        return [undefined, new UpdateTodoDTO(id, text, nuevaFecha)];
    }

}