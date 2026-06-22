import { inject, Injectable } from '@angular/core'; // 💥 Cambiamos Service por Injectable
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

@Injectable({
  providedIn: 'root' // 💥 Esto hace que el servicio sea inyectable globalmente en toda la app
})
export class Weather {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  // Obtenemos el clima actual usando latitud y longitud
  getWeather(lat: number, lon: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m`
    );
  }

  // Intérprete simple de códigos WMO (Weather Interpretation Codes)
  getWeatherDescription(code: number): { text: string; icon: string } {
    if (code === 0) return { text: 'Cielo Despejado', icon: '☀️' };
    if (code >= 1 && code <= 3) return { text: 'Parcialmente Nublado', icon: '⛅' };
    if (code >= 45 && code <= 48) return { text: 'Niebla', icon: '🌫️' };
    if (code >= 51 && code <= 67) return { text: 'Llovizna/Lluvia', icon: '🌧️' };
    if (code >= 71 && code <= 77) return { text: 'Nieve', icon: '❄️' };
    if (code >= 80 && code <= 82) return { text: 'Chubascos', icon: '🌦️' };
    if (code >= 95 && code <= 99) return { text: 'Tormenta', icon: '⛈️' };
    return { text: 'Desconocido', icon: '🌍' };
  }
}
