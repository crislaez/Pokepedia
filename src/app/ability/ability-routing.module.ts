import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilityPage } from './containers/ability.page';


const routes: Routes = [
  {
    path: '',
    component: AbilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbilityPageRoutingModule {}
