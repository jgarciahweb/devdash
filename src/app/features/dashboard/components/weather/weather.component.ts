import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Weather, WeatherData, LocationData } from '../../../../core/services/weather'; // 💥 Importamos LocationData
import { CardComponent } from '../../../../shared/components/card/card.component';
import { firstValueFrom } from 'rxjs';

// Creamos una interfaz combinada para el resultado de nuestra Query
interface FullWeatherData {
  weather: WeatherData;
  location: LocationData;
}

@Component({
  selector: 'app-weather',
  imports: [CommonModule, CardComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  public weatherService = inject(Weather);

  coords = signal<{ lat: number; lon: number } | null>(null);
  geoError = signal<string | null>(null);

  // 💥 Actualizamos el tipo genérico a <FullWeatherData>
  weatherQuery = injectQuery<FullWeatherData>(() => ({
    queryKey: ['weather', this.coords()],
    queryFn: async () => {
      const position = this.coords();

      // Lanzamos ambas peticiones HTTP en paralelo con promesas
      const [weatherRes, locationRes] = await Promise.all([
        firstValueFrom(this.weatherService.getWeather(position!.lat, position!.lon)),
        firstValueFrom(this.weatherService.getLocationName(position!.lat, position!.lon))
      ]);

      return {
        weather: weatherRes,
        location: locationRes
      };
    },
    enabled: !!this.coords(),
    staleTime: 1000 * 60 * 15,
  }));

  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    if (!navigator.geolocation) {
      this.geoError.set('La geolocalización no está soportada.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.coords.set({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      (error) => {
        this.geoError.set('Permiso denegado. Usando Madrid.');
        this.coords.set({ lat: 40.4167, lon: -3.7037 });
      }
    );
  }
}
