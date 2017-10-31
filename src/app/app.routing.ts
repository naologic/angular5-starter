import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { Level0Guard } from './guards/level0.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
},
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canLoad: ['Level0Guard', 'AuthGuard']
            }
        ]
    },
    {
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
    },
    {
        path: '**',
        redirectTo: '404'
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
