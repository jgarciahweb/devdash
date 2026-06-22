import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Weather, WeatherData } from '../../../../core/services/weather'; // 💥 Asegúrate de importar la interfaz WeatherData si está ahí
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, CardComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  // Ponemos public para que el HTML pueda usar métodos como weatherService.getWeatherDescription()
  public weatherService = inject(Weather);

  coords = signal<{ lat: number; lon: number } | null>(null);
  geoError = signal<string | null>(null);

  // 💥 Añadimos <WeatherData> aquí para decirle a TypeScript exactamente qué guarda la Query en su .data()
  weatherQuery = injectQuery<WeatherData>(() => ({
    queryKey: ['weather', this.coords()],
    queryFn: async () => {
      const position = this.coords();
      return await firstValueFrom(this.weatherService.getWeather(position!.lat, position!.lon));
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
