import { Routes } from '@angular/router';

import { AddPageComponent } from './add-page/add-page.component';
import { NewQueryComponent } from './new-query/new-query.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

export const routes: Routes = [
    {path: 'add-new', component: AddPageComponent},
    {path: 'new-query', component: NewQueryComponent},
    {path: '', component: WelcomeScreenComponent, pathMatch: 'full'},
    
];