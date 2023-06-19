import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interfaces';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  public userLocation?: [number, number]
  public isLoadingPlaces: boolean = false
  public places: Feature[] = []

  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation()
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      if (this.userLocation) {
        resolve(this.userLocation)
      } else {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            this.userLocation = [coords.longitude, coords.latitude]
            resolve(this.userLocation)
          },
          (error) => {
            alert('Error getting your location')
            reject(error)
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        )
      }
    })
  }

  getPlacesByQuery(query: string): void {
    if (query.length === 0 || !this.userLocation) {
      this.places = []
      this.isLoadingPlaces = false
      return
    }

    this.isLoadingPlaces = true

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation?.join(','),
      }
    })
      .subscribe(response => {
        this.places = response.features
        this.isLoadingPlaces = false
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation)
      })

  }

  clearPlaces() {
    this.places = []
    this.isLoadingPlaces = false
  }

}
