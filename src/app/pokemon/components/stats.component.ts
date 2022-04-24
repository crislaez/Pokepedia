import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@newPokeData/shared/pokemon';

@Component({
  selector: 'app-stats',
  template:`
    <div>

    </div>
  `,
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent {

  @Input() pokemon: Pokemon;


  constructor() { }



}
