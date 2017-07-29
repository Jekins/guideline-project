import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ComponentsHomeComponent} from './components-home/components-home.component';
import {ComponentsListComponent} from './components-list/components-list.component';
import {ComponentsDetailComponent} from './components-detail/components-detail.component';
import {ComponentsService} from './components.service';

const componentsRoutes: Routes = [
    {path: 'components',  component: ComponentsHomeComponent},
    {path: 'components/:id', component: ComponentsDetailComponent}
];
@NgModule({
    imports: [
        RouterModule.forChild(componentsRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class ComponentsRoutingModule {
}
