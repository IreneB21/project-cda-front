import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HomeService } from '../../../services/home.service';

L.Icon.Default.mergeOptions({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  host: { 'class': 'flex p-5 bg-gray-100 flex-col', 'style':'width:100%' },
})
export class MapComponent implements OnInit, AfterViewInit {

  userId = sessionStorage.getItem("userId");
  private userLatitude = sessionStorage.getItem("latitude");
  private userLongitude = sessionStorage.getItem("longitude");

  private homeService = inject(HomeService);
  posts: Array<any> = [];

  private map!: L.Map;
  //markers: L.Marker[] = [];

  // Centrer carte sur quartier de l'utilisateur, en fonction du rayon choisi 

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const coordinates: [number, number] = [Number(this.userLatitude), Number(this.userLongitude)];
    this.map = L.map('map').setView(coordinates, 13); 
    L.tileLayer(baseMapURl, {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  ngOnInit() {

    this.homeService.getNearbyposts();

    this.homeService.allPosts$.subscribe((data) => {
      this.posts = data;
  
      for (let post of this.posts) {
        const marker = L.marker([post.latitude, post.longitude]);
        marker.addTo(this.map);
        marker.bindPopup(`<b>${post.title}`);
      }
    });
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
