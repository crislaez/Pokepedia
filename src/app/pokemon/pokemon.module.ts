import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GenericsModule } from '@newPokeData/shared-ui/generics/generics.module';
import { PokedexModule } from '@newPokeData/shared/pokedex/pokedex.module';
import { PokemonModule } from '@newPokeData/shared/pokemon/pokemon.module';
import { SharedModule } from '@newPokeData/shared/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AbilitiesComponent } from './components/abilities.component';
import { AboutComponent } from './components/about.component';
import { EncountersComponent } from './components/encounters.component';
import { EvolutionsComponent } from './components/evolutions.component';
import { MovesComponent } from './components/moves.component';
import { SpritesComponent } from './components/sprites.component';
import { PokemonModalComponent } from './containers/pokemon-modal.component';
import { PokemonPage } from './containers/pokemon.page';
import { PokemonPageRoutingModule } from './pokemon-routing.module';


const COMPONENTS = [
  PokemonPage,
  PokemonModalComponent,
  AboutComponent,
  EvolutionsComponent,
  MovesComponent,
  SpritesComponent,
  EncountersComponent,
  AbilitiesComponent
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    GenericsModule,
    PokemonModule,
    PokedexModule,
    TranslateModule.forChild(),
    PokemonPageRoutingModule
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class PokemonPageModule {}
