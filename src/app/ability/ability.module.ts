import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GenericsModule } from '@newPokeData/shared-ui/generics/generics.module';
import { AbilityModule } from '@newPokeData/shared/ability/ability.module';
import { SharedModule } from '@newPokeData/shared/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AbilityPageRoutingModule } from './ability-routing.module';
import { AboutComponent } from './components/about.component';
import { AbilityModalComponent } from './containers/ability-modal.component';
import { AbilityPage } from './containers/ability.page';

const COMPONENTS = [
  AbilityPage,
  AbilityModalComponent,
  AboutComponent
]
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    GenericsModule,
    AbilityModule,
    TranslateModule.forChild(),
    AbilityPageRoutingModule
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class AbilityPageModule {}
