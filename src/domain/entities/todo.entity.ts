
export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public fecha?: Date | null
    ) { }

    get isCompleted() {
        return !!this.fecha;
    }

    public static fromJson(object: { [key: string]: any }): TodoEntity {
        const { id, text, fecha } = object;

        if (isNaN(id)) throw `El argumento ID no es valido`;
        if (!id) throw `El argumento ID es requerido`;
        if (!text) throw `El argumento ID es requerido`;

        let newFecha;
        if (fecha) {
            newFecha = new Date(fecha);
            if (isNaN(newFecha.getTime())) {
                throw 'la fecha no es valida';
            }
        }

        return new TodoEntity(fecha, text, id)

    }

}