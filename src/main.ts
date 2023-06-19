import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import mapboxgl from 'mapbox-gl';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYWxpZW5kbyIsImEiOiJjbGlld3dpYmcwbDd2M2ZxanlpczAxNG1sIn0.J6VHMDHxyXXxWOyYOoSj4g';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
