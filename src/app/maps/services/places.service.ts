import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  public userLocation?: [number, number]

  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }

  constructor() {
    this.getUserLocation()
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      if (this.userLocation) {
        resolve(this.userLocation)
      } else {
        navigator.geolocation.getCurrentPosition(
          ({coords}) => {
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

}
