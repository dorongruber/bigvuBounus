import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';


const routes: Routes = [
  {path: '', component: MainpageComponent},
  {path: 'white', component: MainpageComponent},
  {path: 'blue', component: MainpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
