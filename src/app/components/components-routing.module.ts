import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ComponentsListComponent} from './components-list/components-list.component';
import {ComponentsDetailComponent} from './components-detail/components-detail.component';

const componentsRoutes: Routes = [
    {path: 'components',  component: ComponentsListComponent},
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
