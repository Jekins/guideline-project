import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {ComponentsService} from '../components.service';


@Component({
    selector: 'app-components-list',
    templateUrl: './components-list.component.html',
    styleUrls: ['./components-list.component.css']
})
export class ComponentsListComponent implements OnInit {
    components;
    pages;

    private selectedId: number;

    constructor(
        private componentsService: ComponentsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.componentsService.getData().subscribe((data) => {
            this.components = data;
            console.log(this.components);
        });
    }

    isSelected(component) {
        return component === this.selectedId;
    }

    onSelect(component) {
        console.log(component.id);
        this.router.navigate(['/components/' + component.id]);
    }
}
