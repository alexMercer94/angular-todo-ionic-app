import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/models/lista.model';
import { DeseosService } from 'src/services/deseos.service';

@Component({
    selector: 'app-listas',
    templateUrl: './listas.component.html',
    styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {
    lists: Lista[] = [];
    @Input() terminada = true;
    @ViewChild(IonList) Lista: IonList;

    constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) {
        this.lists = this.deseosService.listas;
    }

    ngOnInit() {}

    /**
     * Redirect a page to another in order to edit a list
     * @param list Receive a list
     */
    selectedList(list: Lista): void {
        if (this.terminada) {
            this.router.navigateByUrl(`/tabs/tab2/agregar/${list.id}`);
        } else {
            this.router.navigateByUrl(`/tabs/tab1/agregar/${list.id}`);
        }
    }

    deleteList(list: Lista): void {
        this.deseosService.deleteList(list);
    }

    async editList(list: Lista) {
        const alert = await this.alertCtrl.create({
            header: 'Editar lista',
            inputs: [
                {
                    name: 'Titulo',
                    type: 'text',
                    value: list.titulo,
                    placeholder: 'Nombre de la lista'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancelar');
                        this.Lista.closeSlidingItems();
                    }
                },
                {
                    text: 'Actualizar',
                    handler: data => {
                        console.log(data);
                        if (data.Titulo.length === 0) {
                            return;
                        }

                        list.titulo = data.Titulo;
                        this.deseosService.saveStorage();
                        this.Lista.closeSlidingItems();
                    }
                }
            ]
        });
        alert.present();
    }
}
