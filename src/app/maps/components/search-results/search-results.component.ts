import { MapService } from './../../services/map.service';
import { Feature } from '../../interfaces/places.interfaces';
import { PlacesService } from './../../services/places.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent {

  public selectedId: string = ''

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces
  }

  get places(): Feature[] {
    return this.placesService.places
  }

  flyTo(place: Feature): void {
    this.selectedId = place.id

    const [lng, lat] = place.center

    this.mapService.flyTo([lng, lat])
  }

  navigateTo(place: Feature): void {

    if (!this.placesService.userLocation) return

    const origin = this.placesService.userLocation!
    const destination = place.center as [number, number]

    this.mapService.getRouteBetweenTwoPoints(
      origin,
      destination
    )
  }


}
