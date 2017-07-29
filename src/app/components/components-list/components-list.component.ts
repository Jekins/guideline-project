import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

import { ComponentsService } from '../components.service';

@Component({
    selector: 'app-components-list',
    templateUrl: './components-list.component.html',
    styleUrls: ['./components-list.component.css']
})
export class ComponentsListComponent implements OnInit {
    @Input() components: Array<{}>;
    selectedComponent;

    constructor(
        private router: Router,
        private componentService: ComponentsService
    ) {
    }

    ngOnInit() {
    }

    onSelect(component) {
        this.selectedComponent = component;
        this.router.navigate(['/components', component.id]);
    }
}
