import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovePage } from './containers/move.page';


const routes: Routes = [
  {
    path: '',
    component: MovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovePageRoutingModule {}
