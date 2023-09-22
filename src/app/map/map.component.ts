import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.gridlayer.googlemutant';
import '@geoman-io/leaflet-geoman-free';
import 'leaflet-ant-path';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  isFullscreen: boolean = false;
  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map', { attributionControl: false }).setView(
      [10.7769, 106.7009],
      13
    );

    //fullscreen
    L.control
      .fullscreen({
        position: 'topleft',
        title: 'Open fullscreen mode',
        titleCancel: 'Exit fullscreen mode',
        content: '',
        forceSeparateButton: true,
        fullscreenElement: false,
      })
      .addTo(this.map);

    //add geofence - plugins
    this.map.pm.addControls({
      position: 'topleft',
      drawMarker: true,
      drawPolyline: true,
      drawRectangle: true,
      drawPolygon: true,
      drawCircleMarker: false,
      editControls: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: false,
      drawText: false,
      drawCircle: true,
    });

    this.map.on('pm:create', (e) => {
      if (e.layer instanceof L.Polyline) {
        const randomColor =
          '#' + Math.floor(Math.random() * 16777215).toString(16);

        e.layer.setStyle({ color: randomColor });
      }
    });

    //ant-path
    const antPath = L.polyline(
      [
        [48.43807, 2.53917],
        [10.326763, 106.326298],
      ],
      {
        color: 'red',
        dashArray: [10, 20],
      }
    ).addTo(this.map);

    //markers
    const markerLayer = L.layerGroup();
    markerLayer.addTo(this.map);

    const vietmapMarker = L.marker([10.7589537, 106.6754041]).addTo(this.map);
    markerLayer.addLayer(vietmapMarker);

    //layers
    const googleRoadmap = L.gridLayer.googleMutant({
      type: 'roadmap',
    });

    googleRoadmap.addTo(this.map);

    const googleTerrain = L.gridLayer.googleMutant({
      type: 'terrain',
    });

    const googleSatellite = L.gridLayer.googleMutant({
      type: 'hybrid',
    });
    const openStreetMap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    );

    const layers = {
      'Google Roadmap': googleRoadmap,
      'Google Satellite': googleSatellite,
      'Google Terrain': googleTerrain,
      'Open Street Map': openStreetMap,
    };

    const overlays = {
      Markers: markerLayer,
    };

    L.control.layers(layers, overlays).addTo(this.map);
  }
}
