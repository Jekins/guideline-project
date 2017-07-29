import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';

import {ComponentsService} from './components.service';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
    components: Array<{}>;
    component: Object;

    constructor(private componentsService: ComponentsService) {
    }

    ngOnInit() {
        this.componentsService
            .getComponents()
            .then(components => this.components = components);
    }
}
