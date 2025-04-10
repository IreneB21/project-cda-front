import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {

  userId = sessionStorage.getItem("userId");

  private map!: L.Map;
  markers: L.Marker[] = [
    // L.marker([23.7771, 90.3994]) // Dhaka, Bangladesh
  ];

  // Centrer carte sur quartier de l'utilisateur, en fonction du rayon choisi 

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map').setView([48.8566, 2.3522], 13); // Paris par exemple
    L.tileLayer(baseMapURl, {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private centerMap() {
    /* 
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map into the boundary
    this.map.fitBounds(bounds);
    */
  }
}
