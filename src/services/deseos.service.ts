import { Injectable } from '@angular/core';
import { Lista } from 'src/models/lista.model';

@Injectable({
    providedIn: 'root'
})
export class DeseosService {
    listas: Lista[] = [];

    constructor() {
        this.loadStorage();
    }

    /**
     * Create list from app
     * @param titulo List's title
     */
    createList(titulo: string) {
        const newList = new Lista(titulo);
        this.listas.push(newList);
        this.saveStorage();

        return newList.id;
    }

    /**
     * Obtein data in order to sho it in agregar component
     * @param id Id of list
     */
    getLista(id: string | number) {
        id = Number(id);
        return this.listas.find((listData: Lista) => listData.id === id);
    }

    /**
     * Save data in local storage
     */
    saveStorage() {
        localStorage.setItem('data', JSON.stringify(this.listas));
    }

    /**
     * Load data from local storage and show
     */
    loadStorage() {
        if (localStorage.getItem('data')) {
            this.listas = JSON.parse(localStorage.getItem('data'));
        } else {
            this.listas = [];
        }
    }

    deleteList(list: Lista) {
        this.listas = this.listas.filter(listaData => listaData.id !== list.id);
        this.saveStorage();
    }
}
