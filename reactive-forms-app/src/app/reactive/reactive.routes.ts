import {Routes} from '@angular/router';
import {BasicPage} from './pages/basic-page/basic-page';
import {DynamicPage} from './pages/dynamic-page/dynamic-page';
import {SwitchePage} from './pages/switche-page/switche-page';

export const authRoutes:Routes = [
  {
    path:'',
    children:[
      {
        path:'basic',
        title:'Basicos',
        component:BasicPage,
      },
      {
        path:'dynamic',
        title:'Dinamicos',
        component:DynamicPage,
      },
      {
        path:'switches',
        title:'Switches',
        component:SwitchePage,
      },
      {
        path:'**',
        redirectTo:'basic'
      }
    ]
  }
];
