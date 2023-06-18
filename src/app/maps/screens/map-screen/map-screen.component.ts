import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'maps-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})

export class MapScreenComponent implements OnInit {

  constructor(
    private placesServices: PlacesService
  ) { }

  ngOnInit() {
  }

}
