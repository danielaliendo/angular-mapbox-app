import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'maps-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements OnInit {

  constructor(
    private placesServices: PlacesService
  ) {}

  ngOnInit() {
    console.log('MapViewComponent.ngOnInit()',
    this.placesServices.isUserLocationReady
    );
  }

}
