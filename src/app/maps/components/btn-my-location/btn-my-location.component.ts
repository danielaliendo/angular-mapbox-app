import { PlacesService } from './../../services/places.service';
import { MapService } from './../../services/map.service';
import { Component } from '@angular/core';

@Component({
  selector: 'maps-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})

export class BtnMyLocationComponent {

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) { }

  goToUserLocation() {

    if (!this.placesService.isUserLocationReady) throw Error('User location not found')

    if (!this.mapService.isMapReady) throw Error('Map is not ready')

    this.mapService.flyTo(this.placesService.userLocation!)
  }

}
