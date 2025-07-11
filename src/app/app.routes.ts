import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetailsPage } from './details/details.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage
    // loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'details/:id',
    component: DetailsPage
    // loadComponent: () => import('./details/details.page').then((m) => m.DetailsPage),
  },
];
