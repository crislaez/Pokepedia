import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { EmptyModalComponent } from './components/empty-modal.component';
import { FilterModalComponent } from './components/filter-modal.component';
import { InfiniteScrollComponent } from './components/infinite-scroll.component';
import { ItemCardComponent } from './components/item-card.component';
import { NoDataComponent } from './components/no-data.component';
import { PokemonCardComponent } from './components/pokemon-card.component';
import { SpinnerComponent } from './components/spinner.component';

const COMPONENTS = [
  SpinnerComponent,
  NoDataComponent,
  InfiniteScrollComponent,
  FilterModalComponent,
  ItemCardComponent,
  PokemonCardComponent,
  EmptyModalComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    TranslateModule.forChild()
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class GenericsModule { }
