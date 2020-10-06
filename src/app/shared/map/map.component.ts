import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { GeoJson } from './map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  // marker
  marker = new mapboxgl.Marker;
  
  @Output() locationEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

    // mapboxgl.accessToken = environment.mapbox.accessToken;
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    //// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      console.log('mapClick');

      this.createMarker(event.lngLat.lng, event.lngLat.lat);

    })

    // this.map.on('load', function () {
    //   this.map.loadImage(
    //     'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
    //     function (error, image) {
    //       if (error) throw error;
    //       this.map.addImage('cat', image);
    //       this.map.addSource('point', {
    //         'type': 'geojson',
    //         'data': {
    //           'type': 'FeatureCollection',
    //           'features': [
    //             {
    //               'type': 'Feature',
    //               'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [0, 0]
    //               }
    //             }
    //           ]
    //         }
    //       });
    //       this.map.addLayer({
    //         'id': 'points',
    //         'type': 'symbol',
    //         'source': 'point',
    //         'layout': {
    //           'icon-image': 'cat',
    //           'icon-size': 0.25
    //         }
    //       });
    //     }
    //   );
    // })
  }


  createMarker(lng: number, lat: number)
  {
    this.marker.remove();
    this.marker = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([lng, lat])
        .addTo(this.map);

    this.locationEvent.next( {lat:lat , lng: lng} );
  }



}

