import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Covid19GraphComponent } from './Components/covid19-graph/covid19-graph.component';


const routes: Routes = [
  {
    path: '',
    component: Covid19GraphComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
