import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';

const Map = () => {

  
  useEffect(() => {
    const map = L.map('map').setView([17.527053, 78.536904], 13); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
    });

    map.addControl(searchControl);

    const locationIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const onMapClick = async (e) => {
      console.log(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);

      const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: locationIcon }).addTo(map);
      const popupContent = document.createElement('div');
      const button = document.createElement('button');
      button.innerText = 'Continue';
      button.onclick = () => {
        // Handle button click action here
        
        console.log('Button clicked');
      };
      popupContent.appendChild(button);
      marker.bindPopup(popupContent).openPopup();

      try {
        const response1 = await fetch(
          `https://api.airvisual.com/v2/nearest_city?lat=${e.latlng.lat}&lon=${e.latlng.lng}&key=154861ae-5eff-4c9c-9344-b2fdf5a1c4ce`
        );
        const data1 = await response1.json();
        console.log('Air Quality:', data1.data.current.pollution.aqius);
        console.log('Temperature: ', data1.data.current.weather.tp);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }

      try {
        const response2 = await fetch(
          `https://secure.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=${e.latlng.lat}&lng=${e.latlng.lng}&username=khusheranjan&style=full`
        );
        const data2 = await response2.json();
        console.log("Elevation:", data2.geonames[0].astergdem);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    map.on('click', onMapClick);

    return () => {
      map.off('click', onMapClick);
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: '80%', height: '80vh' }} />;
};

export default Map;
