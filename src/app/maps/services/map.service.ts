import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interfaces';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';
import { AnySourceData } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})

export class MapService {

  private map?: Map
  private markers: Marker[] = []

  constructor(
    private directionsApi: DirectionsApiClient,
  ) { }

  private drawRoute(route: Route) {

    if (!this.map) throw new Error('Map is not ready')

    // console.log({
    //   distance: route.distance / 1000,
    //   duration: route.duration / 60,
    // })

    const coords = route.geometry.coordinates

    const bounds = new LngLatBounds()

    coords.forEach(coord => bounds.extend(coord))

    this.map?.fitBounds(bounds, {
      padding: 100
    })

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coords
          }
        }]
      }
    }

    if (this.map.getLayer('route')) {
      this.map.removeLayer('route')
      this.map.removeSource('route')
    }


    this.map.addSource('route', sourceData)

    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#3fb1ce',
        'line-width': 3
      }
    })

  }

  get isMapReady(): boolean {
    return !!this.map
  }

  setMap(map: Map) {
    this.map = map
  }

  flyTo(coords: LngLatLike) {

    if (!this.isMapReady) throw new Error('Map is not ready')

    this.map?.flyTo({ center: coords, zoom: 15 })

  }

  createMarkersFromPlaces(places: Feature[], userLocation?: [number, number]) {

    if (!this.map) throw new Error('Map is not ready')

    this.markers.forEach(marker => marker.remove())

    const newMarkers = []

    for (const place of places) {
      const [lng, lat] = place.center

      const popup = new Popup()
        .setHTML(`
        <h6>${place?.text_es || place.text}</h6>
        <span>${place.place_name}</span>
        `)

      const marker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map)

      newMarkers.push(marker)
    }

    this.markers = newMarkers

    if (places.length === 0) return

    const bounds = new LngLatBounds();

    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()))

    if (userLocation) bounds.extend(userLocation)

    this.map.fitBounds(bounds, {
      padding: 100
    })

  }

  getRouteBetweenTwoPoints(origin: [number, number], destination: [number, number]) {

    if (!this.isMapReady) throw new Error('Map is not ready')

    this.directionsApi.get<DirectionsResponse>(`/${origin.join(',')};${destination.join(',')}`)
      .subscribe(resp =>
        this.drawRoute(resp.routes[0])
      )

  }

  clearMarkers() {
    this.markers.forEach(marker => marker.remove())
    this.markers = []
  }

}
