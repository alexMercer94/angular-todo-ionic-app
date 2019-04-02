import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonList } from '@ionic/angular';
import { ListaItem } from 'src/models/lista-item.model';
import { Lista } from 'src/models/lista.model';
import { DeseosService } from 'src/services/deseos.service';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.page.html',
    styleUrls: ['./agregar.page.scss']
})
export class AgregarPage implements OnInit {
    list: Lista;
    nameItem = '';
    @ViewChild('slidingList') slidingList: IonList;

    constructor(private deeseosService: DeseosService, private activatedRoute: ActivatedRoute) {
        const id = activatedRoute.snapshot.paramMap.get('listId');
        this.list = this.deeseosService.getLista(id);
        console.log(this.list);
    }

    ngOnInit() {}

    /**
     * Add an item in list
     */
    addItem() {
        if (this.nameItem.length === 0) {
            return;
        }

        const newItem = new ListaItem(this.nameItem);
        this.list.items.push(newItem);
        this.nameItem = '';
        this.deeseosService.saveStorage();
    }

    /**
     * Change an item in its property completado
     * @param item Item of the list
     */
    changeItem(item: ListaItem) {
        const pendientes = this.list.items.filter(itemData => !itemData.completado).length;
        if (pendientes === 0) {
            this.list.finishedIn = new Date();
            this.list.finished = true;
        } else {
            this.list.finishedIn = null;
            this.list.finished = false;
        }
        this.deeseosService.saveStorage();
        console.log(this.deeseosService.listas);
    }

    async delete() {
        console.log('click');
        /* this.list.items.splice(i, 1);
        this.deeseosService.saveStorage(); */
        await this.slidingList.closeSlidingItems();
    }
}
