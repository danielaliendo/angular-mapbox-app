import { MapService } from './../../services/map.service';
import { PlacesService } from './../../services/places.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  onQueryChanged(query: string) {

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (query.length === 0) {
      this.placesService.clearPlaces()
      this.mapService.clearMarkers()

    }

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query)
    }, 350)

  }

}
