import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypePage } from './containers/type.page';


const routes: Routes = [
  {
    path: '',
    component: TypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypePageRoutingModule {}
