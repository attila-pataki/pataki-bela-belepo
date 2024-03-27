import { Routes } from '@angular/router';

import { AddPageComponent } from './add-page/add-page.component';
import { NewQueryComponent } from './new-query/new-query.component';

export const routes: Routes = [
    {path: 'add-new', component: AddPageComponent},
    {path: 'new-query', component: NewQueryComponent},
    
];