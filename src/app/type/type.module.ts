import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GenericsModule } from '@newPokeData/shared-ui/generics/generics.module';
import { SharedModule } from '@newPokeData/shared/shared/shared.module';
import { TypeModule } from '@newPokeData/shared/type/type.module';
import { TranslateModule } from '@ngx-translate/core';
import { AboutComponent } from './components/about.component';
import { TypeModalComponent } from './containers/type-modal.component';
import { TypePage } from './containers/type.page';
import { TypePageRoutingModule } from './type-routing.module';

const COMPONENTS = [
  TypeModalComponent,
  TypePage,
  AboutComponent
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    GenericsModule,
    TypeModule,
    TranslateModule.forChild(),
    TypePageRoutingModule
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class TypePageModule {}
