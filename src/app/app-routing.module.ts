import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent},
    { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
