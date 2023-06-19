import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapRef') mapElement?: ElementRef;

  constructor(
    private placesServices: PlacesService,
    private mapService: MapService
  ) { }

  ngAfterViewInit() {

    if (!this.mapElement) return

    if (!this.placesServices.userLocation) throw Error('User location not found')

    const map = new Map({
      container: this.mapElement?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesServices.userLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Here you are</h6>
      `)

    const marker = new Marker()
      .setLngLat(this.placesServices.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map)
  }


}
