import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    titulo: string;
    createdIn: Date;
    finishedIn: Date;
    finished: boolean;
    items: ListaItem[];

    constructor(titulo: string) {
        this.titulo = titulo;
        this.createdIn = new Date();
        this.finished = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}
