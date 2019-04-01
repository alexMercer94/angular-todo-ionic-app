import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/models/lista.model';
import { DeseosService } from 'src/services/deseos.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    lists: Lista[] = [];
    constructor(public deseosService: DeseosService, private router: Router) {
        this.lists = this.deseosService.listas;
    }

    addList() {
        this.router.navigateByUrl('/tabs/tab1/agregar');
    }
}
