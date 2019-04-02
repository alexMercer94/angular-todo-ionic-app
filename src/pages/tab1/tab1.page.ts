import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/models/lista.model';
import { DeseosService } from 'src/services/deseos.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    lists: Lista[] = [];
    constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) {
        this.lists = this.deseosService.listas;
    }

    async addList() {
        const alert = await this.alertCtrl.create({
            header: 'Nueva lista',
            inputs: [
                {
                    name: 'Titulo',
                    type: 'text',
                    placeholder: 'Nombre de la lista'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancelar');
                    }
                },
                {
                    text: 'Crear',
                    handler: data => {
                        console.log(data);
                        if (data.Titulo.length === 0) {
                            return;
                        }

                        //Create list
                        const listId = this.deseosService.createList(data.Titulo);
                        this.router.navigateByUrl(`/tabs/tab1/agregar/${listId}`);
                    }
                }
            ]
        });
        alert.present();
    }

    selectedList(list: Lista) {
        this.router.navigateByUrl(`/tabs/tab1/agregar/${list.id}`);
    }
}
