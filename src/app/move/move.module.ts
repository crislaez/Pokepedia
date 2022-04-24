import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GenericsModule } from '@newPokeData/shared-ui/generics/generics.module';
import { MoveModule } from '@newPokeData/shared/move/move.module';
import { SharedModule } from '@newPokeData/shared/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AboutComponent } from './components/about.component';
import { MoveModalComponent } from './containers/move-modal.component';
import { MovePage } from './containers/move.page';
import { MovePageRoutingModule } from './move-routing.module';

const COMPONENTS = [
  MovePage,
  MoveModalComponent,
  AboutComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    GenericsModule,
    MoveModule,
    TranslateModule.forChild(),
    MovePageRoutingModule
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class MovePageModule {}
